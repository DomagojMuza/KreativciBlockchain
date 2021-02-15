<template>
  <div class="home">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <b-button
            class="is-success is-large connect"
            rounded
            @click="connectToMetaMask()"
            >Connect to MetaMask</b-button
          >
        </div>
        <div class="wrapper">
          <div class="headline">Disocver new Tales</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      acc: false,
    };
  },
  async created() {
    // this.loadAcc();
    // var account = await window.web3.eth.getAccounts();
    // let result = await this.$contract.methods
    //   .postStory("asdasf", "Star wars", "Luke, I am your father")
    //   .send({ from: store.account });
    // const event = result.events.postingStory.returnValues;
    // console.log(event);
  },
  methods: {
    async loadAcc() {
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
        console.log(accs[0]);
        this.$router.push("/tales");
      }
    },
    connectToMetaMask() {
      this.$store.connectToMeta();
      this.loadAcc()
    },
  },
};
</script>

<style scoped>
.connect {
  background: white !important;
  color: #7a00d8 !important;
  padding-bottom: 17.5px;
  font-weight: bold;
  font-size: 32px !important;
}

.headline {
  /* width: 100%; */
  font-size: 40px;
  color: #7a00d8 !important;
  font-weight: bold;
  text-align: end;
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}
.home {
  --dark: #6000ab;
  --light: #a52bfd;
  --white: white;
}
.wrapper {
  position: relative;
  height: 87vh;
  width: 30%;
  border-radius: 10px;
  background: white !important;
  /* border-radius: 2rem; */
  box-shadow: -5px 5px 0px var(--dark), -5px 0px 0px var(--dark),
    0px 5px 0px var(--dark), -10px 10px 0px var(--light),
    -10px 0px 0px var(--light), 0px 10px 0px var(--light),
    -15px 15px 0px var(--dark), -15px 0px 0px var(--dark),
    0px 15px 0px var(--dark), -20px 20px 0px var(--light),
    -20px 0px 0px var(--light), 0px 20px 0px var(--light),
    -25px 25px 0px var(--dark), -25px 0px 0px var(--dark),
    0px 25px 0px var(--dark), -30px 30px 0px var(--light),
    -30px 0px 0px var(--light), 0px 30px 0px var(--light),
    -37px 37px 0px var(--white), -37px 0px 0px var(--white),
    0px 37px 0px var(--white), 10px 37px 0px var(--white),
    10px 0px 0px var(--white), 0px -5px 0px var(--white),
    10px -5px 0px var(--white), -37px -5px 0px var(--white);
}
</style>