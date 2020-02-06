<template>
  <div id="app" :class="{ ' sulphur ': isSulphurFontSelected }">
    <div class="font-select">
      <input
        type="checkbox"
        :checked="isSulphurFontSelected"
        @change="isSulphurFontSelected = !isSulphurFontSelected"
        id="sulphurSelected"
      />
      <label for="sulphurSelected" aria-label>Use Sulphur Point as font</label>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSulphurFontSelected: false
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Sulphur+Point|Raleway&display=swap");

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "Raleway", Helvetica, Arial, sans-serif;

  /* The text said Sulphur point but the image used Raleway so I made the font togglabble*/
  &.sulphur {
    font-family: "Sulphur Point", Helvetica, Arial, sans-serif;
  }

  .font-select {
    text-align: right;
  }
}
</style>
