<template>
  <div>
    <div class="loading" v-if="loading">{{ loading }}</div>
    <div class="comic" v-else-if="selectedComic.num && !loading">
      <router-link class="back" to="/">&#60; Back</router-link>
      <h2>Comic #{{ selectedComic.num }}</h2>

      <div class="nav-buttons">
        <router-link
          class="nav-button"
          v-if="selectedComic.num > 1"
          :to="'/' + (selectedComic.num - 1)"
          >&#60; Previous comic</router-link
        >
        <span v-else>This is the first comic</span>
        <router-link
          class="nav-button"
          v-if="!currentComic || selectedComic.num < currentComic.num"
          :to="'/' + (selectedComic.num + 1)"
          >Next comic &#62;</router-link
        >
        <span v-else>This is the latest comic</span>
      </div>
      <h1>{{ selectedComic.title }}</h1>
      <img
        class="comic-img"
        :alt="selectedComic.alt"
        :src="selectedComic.img"
      />
    </div>
    <div v-else class="comic-not-found">
      <h2>This comic was not found</h2>
      <router-link class="nav-button" :to="'/' + currentComic.num"
        >Show latest comic</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

/** @description A page to display a single comic
 * If user enters the page by clicking and image, comic data is already saved in store in `selectedComic`
 * If `selectedComic` is not available (e.g. user enters page directly from url, the API request is sent to Vuex)
 */
export default {
  computed: {
    ...mapGetters(["selectedComic", "currentComic", "loading"])
  },
  methods: {
    ...mapActions(["fetchComicByNumber", "fetchCurrentComic"])
  },
  created() {
    const number = this.$route.params.id;
    // if current selected comic number is different than url, fetch the new comic
    if (this.selectedComic.num !== number) {
      const number = this.$route.params.id;
      this.fetchComicByNumber(number);
    }
    if (!this.currentComic || !this.currentComic.num) {
      // if current comic number is not known, fetch it too to decide when to show next button
      this.fetchCurrentComic();
    }
  },
  watch: {
    // as we are in the same component, watch also changes when user clicks previous/next buttons and fetch corresponding image
    $route(to) {
      this.fetchComicByNumber(to.params.id);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/animations.scss";

.back {
  text-align: left;
  position: absolute;
  left: 2em;
  color: black;
  font-size: 1.2em;
}

.comic-img {
  max-width: 100%;
  @include fade;
}

.nav-buttons {
  margin: 3em 1em;
}

a.nav-button {
  text-decoration: none;
  background-color: black;
  margin: 1em;
  padding: 0.5em 1em;
  border-radius: 5px;
  color: white;

  &:hover {
    opacity: 0.7;
  }
}

.comic-not-found {
  margin-top: 35vh;
}
</style>
