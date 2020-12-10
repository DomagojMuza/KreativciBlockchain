<template>
  <div
    class="wrapper"
    v-infinite-scroll="imageHashLink"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="4000"
  >
    <div v-for="image in imageLinks" :key="image" class="image">
      <img :src="image" webp-fallback=".jpg" ratio="4by3" />
    </div>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";

export default {
  directives: { infiniteScroll },
  data() {
    return {
      noOfImages: Number,
      imageLinks: [],
    };
  },
  async created() {
    let res = await this.$store.fanArtCount();
    this.noOfImages = await parseInt(res);
    this.imageHashLink();
  },
  methods: {
    async imageHashLink() {
      if (this.noOfImages >= 0) {
        let imageHashLink = await this.$store.contract.methods.fanArt(this.noOfImages).call({ from: this.$store.account });
        this.imageLinks.push("https://ipfs.infura.io/ipfs/" + imageHashLink);
        this.noOfImages--;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.wrapper {
  min-height: 107vh;
}
</style>