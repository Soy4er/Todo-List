<template>
  <div id="app">
    <router-view/>
    <delete-note :show="false" />
  </div>
</template>

<script>
import DeleteNote from "@/components/DeleteNote.vue";

export default {
  name: 'App',
  components: {
    DeleteNote
  },
  async created() {
    this.$store.dispatch("startApp");
  }
}
</script>

<style>
#app {

}
</style>
