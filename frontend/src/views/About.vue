<template>
  <div class="all">
    <div class="columns tales">
      <div
        class="column is-12"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <div class="container">
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
      tales: [],
      busy: false,
      slicePosition: 0,
      talesCount: null,
      imageLinks: [],
    };
  },
  async created() {
    await this.initLoad();
    
  },
  methods: {
    async loadMore() {
      try {
        for(let i=0; i<3; i++){
          if(this.talesCount <= -1) return
          let tale = await this.$store.getTaleData(this.talesCount)
          this.tales.push(tale)
          this.talesCount--
        }
      } catch (error) {
        this.$error.fireToast(error);
      }
    },
    async initLoad(){
      this.talesCount = await this.$store.talesCount()
      console.log(this.talesCount);
      await this.loadMore()
      this.loaded = true; 
      }
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