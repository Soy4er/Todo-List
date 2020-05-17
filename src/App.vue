<template>
  <div id="app">
    <router-view />
    <delete-note :show="false" />
  </div>
</template>

<script>
export default {
  name: "App",
  async created() {
    this.$store.dispatch("startApp");
  }
};
</script>
