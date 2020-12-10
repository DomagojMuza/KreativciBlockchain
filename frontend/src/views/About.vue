<template>
  <div class="all">
    <div class="columns tales">
      <div
        class="column is-12"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <div class="container" v-if="loaded">
          <div v-for="tale in tales" :key="tale.id">
            <Tale v-bind:tale="tale" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tale from "@/components/Tale";
import infiniteScroll from "vue-infinite-scroll";
export default {
  directives: { infiniteScroll },
  components: {
    Tale,
  },
  data() {
    return {
      tales: null,
      busy: false,
      slicePosition: 0,
      loaded: false,
      fanArtCount: null,
      imageLinks: [],
    };
  },
  async created() {
    try {
      await this.$store.getAllTales();
      this.tales = this.$store.firstThree;
      this.loaded = true;
    } catch (error) {
      console.log(error);
      this.$error.fireToast(error);
    }
  },
  methods: {
    loadMore() {
      if (!this.loaded) {
        return;
      }
      try {
        this.busy = true;
        let nextTales = this.$store.nextTales(this.slicePosition);
        nextTales.forEach((tale) => {
          this.tales.push(tale);
          this.slicePosition++;
        });
        this.busy = false;
      } catch (error) {
        this.$error.fireToast(error);
      }
    },
  },
};
</script>
<style scoped>
.all {
  padding-top: 7vh;
}
.tales {
  min-height: 93vh;
  margin: 0;
}
.container {
  min-height: 83vh;
}
</style>