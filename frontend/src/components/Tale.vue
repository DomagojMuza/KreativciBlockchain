<template>
  <router-link
    :to="{
      name: 'ViewTale',
      params: { id: tale.id },
    }"
  >
    <div class="card">
      <div class="card-content custom-padding-bt">
        <div class="media-content">
          <div class="title">
            {{ tale.headline.substr(0, 17) }}
            <p class="if" v-if="tale.headline.length > 17">...</p>
          </div>
          <p class="subtitle is-6">
            {{ tale.postedBy.substr(0, 6) }}...{{
              tale.postedBy.substr(tale.postedBy.length - 4)
            }}
          </p>
        </div>
      </div>
      <div class="card-content">
        <div class="content">
          {{ tale.content.substr(0, 250) }}
          <p class="if" v-if="tale.content.length > 250">...</p>
          <br />
          <time class="time"
            >{{ tale.postedAt.getDate() }}.{{ tale.postedAt.getMonth() }}.{{
              tale.postedAt.getFullYear()
            }}</time
          >
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: ["tale"],
};
</script>
<style lang="css" scoped>
.card {
  width: 60%;
  margin: auto;
  margin-top: 8vh;
  /* background: linear-gradient(145deg, #ffffff, #e6e6e6); */
}
.card:hover {
  box-shadow: inset -20px 20px 11px #d9d9d9, inset 20px -20px 11px #ffffff;
}
.subtitle {
  color: rgb(141, 141, 141);
}
.custom-padding-bt {
  padding-bottom: 0px;
}
.time {
  color: rgb(141, 141, 141);
  font-size: 10px;
}
.if {
  display: inline;
}
.content {
  font-size: 20px;
}
</style>