<template>
  <div class="root">
    <div class="viewTale">
      <div class="card main-content">
        <div class="card-content custom-padding-bt">
          <div class="media-content">
            <div class="title">
              {{ tale.headline }}
            </div>
            <div class="subtitle is-6" @click.prevent="donate()">
              <p class="addr">
                {{ tale.postedBy.substr(0, 6) }}...{{
                  tale.postedBy.substr(tale.postedBy.length - 4)
                }}
              </p>

              <p>&#8592; Click to Donate</p>
            </div>
          </div>
        </div>
        <div class="card-content">
          <div class="content">
            {{ tale.content }}
            <br />
            <time class="time"
              >{{ tale.postedAt.getDate() }}.{{ tale.postedAt.getMonth() }}.{{
                tale.postedAt.getFullYear()
              }}</time
            >
          </div>
        </div>
      </div>
    </div>
    <div class="card card-input">
      <b-field class="card-content">
        <b-input
          v-model="newComment"
          placeholder="Write your comment"
          v-on:keyup.native.enter="postComment()"
        ></b-input>
      </b-field>
    </div>
    <div class="card comments" v-for="comment in comments" :key="comment">
      <div class="card-content">
        <div class="content">
          {{ comment.comment }}
        </div>
        <time class="time"
          >{{ comment.postedAt.getDate() }}.{{ comment.postedAt.getMonth() }}.{{
            comment.postedAt.getFullYear()
          }}</time
        >
      </div>
    </div>
  </div>
</template>

<script>
// import web3 from "web3";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import db from "@/firebase/firebaseInit";
export default {
  name: "ViewTale",
  data() {
    return {
      donation: 0,
      tale: {},
      comments: [],
      newComment: "",
    };
  },
  async created() {
    await this.getTale();
    await this.getComments();
  },

  methods: {
    async donate() {
      const { value: ipAddress } = await Swal.fire({
        title: "How much gwei you want to donate",
        input: "number",
        inputLabel: "1 Eth = 1,000,000,000 gwei",
        inputValue: this.donation,
        showCancelButton: true,
      });
      let don = ipAddress.replace(/[^0-9]/g, "");
      don = parseInt(don, 10);
      window.web3.eth
        .sendTransaction({
          from: this.$store.account,
          to: this.tale.postedBy,
          value: don * 1000000000,
        })
        .then(function (receipt) {
          console.log(receipt);
        });
    },
    async getTale() {
      let content = await db.collection("content").doc(this.$route.params.id).get();
      let tale = await this.$store.contract.methods.getStory(this.$route.params.id).call({ from: this.$store.account });
      this.tale = {
        content: content.data().content,
        id: tale.id,
        headline: tale.headline,
        postedBy: tale.postedBy,
        postedAt: new Date(parseInt(tale.postedAt) * 1000),
      };
    },
    async getComments() {
      let res = await this.$store.getComments(this.$route.params.id);
      this.comments = res;
    },
    async postComment() {
      await this.$store.postComment(this.$route.params.id, this.newComment);
    },
  },
};
</script>

<style lang="css" scoped>
.viewTale {
  padding: 7vh;
  height: 100%;
}
.root {
  min-height: 100vh;
  padding-bottom: 4vh;
}
.card {
  height: 100%;
  width: 60%;
  margin: auto;
}
.subtitle {
  color: rgb(141, 141, 141);
}
.time {
  color: rgb(141, 141, 141);
  font-size: 10px;
}
.content {
  font-size: 20px;
  white-space: pre-line;
  cursor: default;
  margin-bottom: 0;
}
.title {
  cursor: default;
}
.subtitle {
  display: -webkit-box;
}
.addr:hover {
  color: blueviolet;
  cursor: pointer;
}
.card-input {
  margin-bottom: 6vh;
  width: 50%;
}
.comments {
  margin-bottom: 2vh;
  width: 40%;
}
.main-content {
  margin-top: 7vh;
}
</style>