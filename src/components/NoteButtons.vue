<template>
  <div class="buttons-bar --desktop">
    <button
      type="button"
      class="buttons-bar__task-create buttons-bar__item btn btn--circle"
      @click="createTask"
    >
      <font-awesome-icon icon="plus" />Create a new task
    </button>
    <button
      type="button"
      class="buttons-bar__undo buttons-bar__item btn btn--circle"
      @click="showConfirmUndo = !showConfirmUndo"
    >
      <font-awesome-icon icon="undo-alt" />Undo changes to a note
    </button>
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
    <button
      type="button"
      class="buttons-bar__note-trash buttons-bar__item btn btn--circle"
      @click="showConfirmDeletion = !showConfirmDeletion"
      v-if="this.getNote"
    >
      <font-awesome-icon :icon="['far', 'trash-alt']" />Delete a note
    </button>
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
    <button type="submit" class="buttons-bar__note-save buttons-bar__item">
      <font-awesome-icon icon="check" />Save a note
    </button>
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
  position: absolute;
  top: 20px;
  left: 520px;
  user-select: none;
  outline: none;
  & .confirmation-panel {
    left: -80px;
  }
  & .confirmation-panel--undo {
    top: 80px;
  }
  & .confirmation-panel--delete {
    top: 120px;
  }
  &__item {
    width: 30px;
    height: 30px;
    overflow: hidden;
    background-color: $primary;
    color: $white;
    border-radius: 20px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    white-space: nowrap;
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
    padding: 0;
    border: none;
    &:last-child {
      margin-bottom: 0;
    }
    & svg {
      margin: 0 9px;
    }
  }
  &__task-create:hover {
    width: 165px;
  }
  &__note-trash:hover {
    width: 135px;
  }
  &__note-save {
    &:hover {
      width: 125px;
    }
  }
  &__goback:hover {
    width: 225px;
  }
  &__undo:hover {
    width: 210px;
  }
}

@media (max-width: 768px) {
  .buttons-bar {
    display: none;
  }
}
</style>