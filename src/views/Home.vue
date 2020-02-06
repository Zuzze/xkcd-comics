<template>
  <div class="home">
    <h1 class="title">
      The
      <b>latest</b> comics
    </h1>
    <ComicGrid></ComicGrid>
  </div>
</template>

<script>
import ComicGrid from "@/components/ComicGrid.vue";

export default {
  name: "Home",
  components: {
    ComicGrid
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: auto;
  text-align: center;

  .title {
    font-weight: normal;
    font-size: 2.5em;
  }
}
</style>
