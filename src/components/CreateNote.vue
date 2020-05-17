<template>
  <div class="create-note" @click="createNote">
    <font-awesome-icon icon="plus" />
  </div>
</template>

<script>
export default {
  methods: {
    createNote() {
      const allNotes = this.$store.getters["allNotes"],
        noteID = allNotes.length === 0 ? 1 : allNotes[allNotes.length - 1] + 1;
      this.$router.push({ name: "updateNote", params: { id: noteID } });
    }
  }
};
</script>

<style lang="scss">
.create-note {
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: $primary;
  color: $white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>