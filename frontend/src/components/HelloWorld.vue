<template>
  <b-navbar :centered="true" class="nav">
    <template class="center" slot="start">
      <b-navbar-item><AddTale /></b-navbar-item>
      <b-navbar-item><FanArtAdd /></b-navbar-item>
      <b-navbar-item tag="router-link" to="/tales"> Tales </b-navbar-item>
      <b-navbar-item tag="router-link" to="/fanart"> FanArt's </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import AddTale from "@/components/AddTale";
import FanArtAdd from "@/components/FanArtAdd";
export default {
  name: "navbar",
  components: {
    AddTale,
    FanArtAdd,
  },
};
</script>


<style scoped>
.nav {
  position: absolute !important;
  width: 100% !important;
  min-height: 6vh;
  background-color: transparent;
  font-size: 24px;
}
.navbar-item,
.navbar.link {
  color: whitesmoke;
}
a.navbar-item:focus {
  background-color: transparent;
  color: whitesmoke;
}
a.navbar-item:hover {
  background-color: #fafafa;
  color: #7957d5;
}
</style>