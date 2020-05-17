<template>
  <div id="app">
    <router-view />
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
