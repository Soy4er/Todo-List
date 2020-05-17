<template>
  <div class="container">
    <div class="todo-list">
      <h1>TODO List</h1>
      <notes />
    </div>
    <create-note />
  </div>
</template>

<script>
import Notes from "@/components/Notes.vue";
import CreateNote from "@/components/CreateNote.vue";

export default {
  components: {
    Notes,
    CreateNote,
  }
}
</script>

<style lang="scss">
  .todo-list {
    margin-top: 50px;
    & h1 {
      font-size: $font-size-xl;
      margin-bottom: 20px;
      text-align: center;
    }
  }
</style>