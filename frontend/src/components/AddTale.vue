<template>
  <section>
    <div @click="cardModal()">Add your tale</div>
  </section>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import EventBus from '@/event-bus/bus';
export default {
  methods: {
    async cardModal() {
      const { value: formValues } = await Swal.fire({
        confirmButtonText: "Post tale",
        html:
          '<label for="headline" style="font-size:24px; color:grey;">Headline</label>' +
          '<input id="headline" maxlength="30" class="swal2-input" minlength="8">' +
          '<label for="content" style="font-size:24px; color:grey;">Content</label>' +
          '<textarea id="content" class="swal2-textarea" style="height:400px; max-width:414px" maxlength="10000"></textarea>' +
          '<p style="font-size:16px; color:grey;">Max 10000 charachters</p>',
        focusConfirm: false,
        preConfirm: async () => {
          let headline = document.getElementById("headline").value;
          let content = document.getElementById("content").value;

          if (
            headline === "" ||
            content === "" ||
            headline.length < 4 ||
            content.length <= 200
          )
            return this.$error.fireError("Headline(4 characters) and content(200 characters) must be longer");

          await this.$store.postStory(headline, content);
          Swal.fire("Posted!");
          localStorage.clear();
          this.$store.getAllTales();
          EventBus.$emit('newTaleAdded');
        },
      });
      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
    },
  },
};
</script>
<style lang="css" scoped>
.navbar-item {
  color: whitesmoke;
}
</style>