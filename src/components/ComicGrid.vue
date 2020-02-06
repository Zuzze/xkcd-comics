<template>
  <div class="grid-wrapper">
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <div class="grid" v-else>
      <template v-show="comics && comics.length > 0 && comics[0] !== null">
        <div
          class="comic"
          v-for="comic in comics"
          :key="comic.num"
          @click="enterComicPage($event, comic)"
        >
          <div class="comic-thumbnail">
            <p class="comic-title">{{ comic.title }}</p>
            <img :alt="comic.alt" :src="comic.img" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "ComicGrid",
  computed: {
    ...mapGetters(["comics", "loading"])
  },
  methods: {
    ...mapActions(["fetchComics", "selectComic"]),
    async enterComicPage($event, comic) {
      await this.selectComic(comic);
      this.$router.push("/" + comic.num);
    }
  },
  created() {
    this.fetchComics();
  },
  components: {
    LoadingSpinner
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/animations.scss";

.grid-wrapper {
  margin: 0 auto;
  text-align: center;
  padding: 1.5em;
}

.grid {
  /* CSS Grid is another option but as it 
  [limited support](https://caniuse.com/#feat=css-grid), 
  compared to [flexbox support](https://caniuse.com/#search=flex) */
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  align-items: center;
  justify-content: center;

  .comic {
    display: flex;
    padding: 0 1em;
    @include fade; // from animations.scss
  }
}

.comic-thumbnail {
  margin: 0.5em;
  padding: 0.5em;
  border: solid 2px transparent;
  border-radius: 5px;

  &:hover {
    border: solid 2px lightgray;
  }

  .comic-title {
    font-weight: bold;
    color: black;
    text-decoration: none;
  }

  img {
    overflow: hidden;
    height: 300px;
    overflow: auto;
  }
}

/* On tablet and mobile show only one column and fit to screen */
@media (max-width: 1024px) {
  .grid {
    display: block;
    .comic {
      display: block;
      width: 100%;
      padding: 0;
    }
  }

  .comic-thumbnail {
    margin: 0;

    .comic-title {
      font-weight: bold;
    }

    img {
      width: auto;
      max-width: 100%;
      max-height: 2000px;
      height: auto;
    }
  }
}
</style>
