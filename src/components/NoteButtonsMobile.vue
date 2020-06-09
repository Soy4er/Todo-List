<template>
  <div class="buttons-bar">
    <div class="buttons-bar__content">
      <div class="buttons-bar__left">
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
          v-if="this.getNote"
        >
          <font-awesome-icon :icon="['far', 'trash-alt']" />
        </button>
      </div>
      <div class="buttons-bar__center">     
        <button type="submit" class="buttons-bar__note-save buttons-bar__item">
          <font-awesome-icon icon="check" />
        </button>
      </div>
      <div class="buttoms-bar__right">
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
    </transition>
    <transition name="fade">
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
.buttons-bar {
  &__content {
    display: grid;
    grid-template-columns: 1fr 50px 1fr;
    grid-column-gap: 10px;
    height: 100%;
    padding: 10px 20px;
  }
  &__item {
    border: none;
    background-color: initial;
  }
  &__note-save {
    position: absolute;
    bottom: 10px;
    left: calc(50% - 25px);
    box-shadow: 0 3px 4px #888888;
    width: 50px;
    height: 50px;
    overflow: hidden;
    background-color: $primary;
    color: $white;
    border-radius: 50px;
    transition: .3s;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 0;
    cursor: pointer;
    border: 0;
    & svg {
      margin: 0 19px;
    }
  }
}
</style>