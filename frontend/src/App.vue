<template>
  <div id="app">
    <!-- v-if="$store.connected == true"  -->
    <navbar class="navbar" v-if="$store.connected == true" />
    <router-view />
  </div>
</template>

<script>
import navbar from "@/components/HelloWorld";
export default {
  name: "App",
  components: {
    navbar,
  },
  async created() {
    try {
      this.$store.connectToMeta();
      let accs = await window.web3.eth.getAccounts();
      if (accs == undefined || accs[0] == undefined) {
        setTimeout(
          function () {
            this.loadAcc();
          }.bind(this),
          3000
        );
      } else {
        this.$store.account = accs[0];
        this.$store.connected = true;
      }
    } catch (error) {
      this.$error.errorToast(error);
    }
  },
};
</script>

<style>
html {
  height: 100vh;
}
body {
  background-image: linear-gradient(to bottom right, #7a00d8, #a63ef7);
  background-color: #7a00d8;
  background-size: 100% 100%;
  min-height: 100%;
  font-family: "Roboto", sans-serif !important;
}
#app {
  min-height: 100vh;
}
/* Hide scrollbar for Chrome, Safari and Opera */
html::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
html {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
