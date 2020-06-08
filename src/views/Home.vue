<template>
  <div class="container">
    <main class="todo-list">
      <h1 class="title text-center mb-10 mt-10">TODO List</h1>
      <Notes />
    </main>
    <ButtonCreateNote />
  </div>
</template>

<script>
import Notes from "@/components/Notes.vue";
import ButtonCreateNote from "@/components/ButtonCreateNote.vue";

export default {
  components: {
    Notes,
    ButtonCreateNote
  }
};
</script>