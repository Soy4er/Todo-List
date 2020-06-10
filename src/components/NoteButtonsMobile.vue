<template>
  <div class="buttons-bar --mobile">
    <div class="buttons-bar__content">
      <div class="buttons-bar__element buttons-bar__left">
        <button
          type="button"
          class="buttons-bar__undo buttons-bar__item btn btn--circle"
          @click="showConfirmUndo = !showConfirmUndo"
        >
          <font-awesome-icon icon="undo-alt" />
        </button>
        <button
          type="button"
          class="buttons-bar__note-trash buttons-bar__item btn btn--circle"
          @click="showConfirmDeletion = !showConfirmDeletion"
        >
          <font-awesome-icon :icon="['far', 'trash-alt']" />
        </button>
      </div>
      <div class="buttons-bar__center">
        <button type="submit" class="buttons-bar__note-save buttons-bar__item">
          <font-awesome-icon icon="check" />
        </button>
      </div>
      <div class="buttons-bar__element buttons-bar__right">
        <button
          type="button"
          class="buttons-bar__task-create buttons-bar__item btn btn--circle"
          @click="createTask"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
    <transition name="fade">
      <div
        class="confirmation-panel confirmation-panel--undo"
        v-if="showConfirmUndo"
        v-click-outside="onClickOutsideUndo"
      >
        <p>Are you sure you want to undo the changes?</p>
        <div class="confirmation-panel__buttons">
          <button
            type="button"
            class="confirmation-panel__buttons-cancel btn"
            @click="showConfirmUndo = false"
          >Cancel</button>
          <router-link
            :to="{name: 'home'}"
            class="confirmation-panel__buttons-confirm btn btn--primary"
          >Confirm</router-link>
        </div>
      </div>
      <div
        class="confirmation-panel confirmation-panel--delete"
        v-if="showConfirmDeletion"
        v-click-outside="onClickOutsideDelete"
      >
        <p>Are you sure you want to delete note?</p>
        <div class="confirmation-panel__buttons">
          <button
            type="button"
            class="confirmation-panel__buttons-cancel btn"
            @click="showConfirmDeletion = false"
          >Cancel</button>
          <button
            class="confirmation-panel__buttons-confirm btn btn--primary"
            @click="deleteNote"
          >Confirm</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["noteID"],
  data() {
    return {
      showConfirmUndo: false,
      showConfirmDeletion: false
    };
  },
  methods: {
    onClickOutsideUndo() {
      this.showConfirmUndo = false;
    },
    onClickOutsideDelete() {
      this.showConfirmDeletion = false;
    },
    createTask() {
      const tasks = this.getNote.tasks.slice().sort((a, b) => {
          return b.id - a.id;
        }),
        id = tasks[0].id++;
      this.$emit("createTask", { id, done: false });
    },
    deleteNote() {
      this.$store.commit("deleteNote", this.noteID);
      this.$router.push({ name: "home" });
    }
  },
  computed: {
    ...mapGetters(["getNoteByID"]),
    getNote() {
      return this.getNoteByID(this.noteID);
    }
  }
};
</script>

<style lang="scss" scoped>
.confirmation-panel {
  position: fixed;
}
</style>