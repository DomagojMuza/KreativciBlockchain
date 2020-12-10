<template>
  <section>
    <b-navbar-item @click="cardModal()">Post Fan Art</b-navbar-item>
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
  </section>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ipfsClient from "ipfs-http-client";
import * as nsfwjs from "nsfwjs";
import * as tf from "@tensorflow/tfjs";
import jpeg from "jpeg-js";

export default {
  data() {
    return {
      isLoading: false,
      allowedExtensions: /(\.jpg|\.jpeg|\.png|\.gif)$/i,
      ipfs: ipfsClient({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
      }),
      check: {
        Drawing: function (percentage) {
          return percentage < 1;
        },
        Sexy: function (percentage) {
          return percentage < 0.35;
        },
        Porn: function (percentage) {
          return percentage < 0.3;
        },
        Hentai: function (percentage) {
          return percentage < 0.3;
        },
        Neutral: function (percentage) {
          return percentage < 1;
        },
      },
    };
  },
  methods: {
    async cardModal() {
      const { value: file } = await Swal.fire({
        showLoaderOnConfirm: true,
        title: "Select image",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "Upload your fanart",
        },
      });
      if (!file || !this.allowedExtensions.exec(file.name)) return this.$error.fireError("You must select image");

      this.isLoading = true;

      let reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onloadend = async () => {
        let buffer = Buffer(reader.result);

        const image = await this.convert(buffer);
        const model = await nsfwjs.load();
        const predictions = await model.classify(image);
        image.dispose()
        for (const key in predictions) {
          let className = predictions[key].className
          let probability = predictions[key].probability

          if (!this.check[className](probability)) {
            this.isLoading = false;
            return this.$error.fireToast("Image not allowed");
          }
        }

        let response = await this.ipfs.add(buffer);
        this.isLoading = false;
        await this.$store.contract.methods.postFanArt(response.path).send({ from: this.$store.account });
        Swal.fire("Fan Art posted", "success");
      };
    },
    async convert(img) {
      const image = await jpeg.decode(img, true);

      const numChannels = 3;
      const numPixels = image.width * image.height;
      const values = new Int32Array(numPixels * numChannels);

      for (let i = 0; i < numPixels; i++)
        for (let c = 0; c < numChannels; ++c)
          values[i * numChannels + c] = image.data[i * 4 + c];

      return tf.tensor3d(values, [image.height, image.width, numChannels], "int32");
    },
  },
};
</script>
<style lang="css" scoped>
.navbar-item {
  color: whitesmoke;
}
</style>