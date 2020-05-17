<template>
  <div id="app">
    <router-view />
    <notifications group="notification" />
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
