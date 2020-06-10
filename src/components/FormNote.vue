<template>
  <form @submit.prevent="submit" class="note">
    <div class="note-name mb-10">
      <input
        type="text"
        name="noteName"
        id="noteName"
        required
        v-model.trim="note.name"
        class="note-input"
        placeholder="Note name"
      />
    </div>
    <div class="note-tasks">
      <div class="note-tasks__item mb-10" v-for="(task, index) in note.tasks" :key="index">
        <div class="note-tasks__item-element note-tasks__item-checkbox --desktop">
          <input
            type="checkbox"
            :name="`done_${task.id}`"
            :id="`done_${task.id}`"
            v-model="task.done"
          />
          <label :for="`done_${task.id}`">
            <font-awesome-icon icon="check" />
          </label>
        </div>
        <div
          class="note-tasks__item-element note-tasks__item-name"
          :class="{'note-tasks__item-element--active': task.done}"
          v-swipeable="dragToRefresh"
        >
          <TextareaAutosize
            :min-height="20"
            :max-height="100"
            :name="`name_${task.id}`"
            :id="`name_${task.id}`"
            v-model.trim="task.name"
            class="note-input"
            placeholder="Task name"
            :disabled="task.done"
          />
        </div>
        <div class="note-tasks__item-element --desktop">
          <div class="note-tasks__item-delete" @click="deleteTask(index)">
            <font-awesome-icon icon="times" />
          </div>
        </div>
        <div class="note-buttons --mobile">
          <div class="note-buttons__item note-buttons__item--checkbox">
            <input
              type="checkbox"
              :name="`done_${task.id}`"
              :id="`done_${task.id}`"
              v-model="task.done"
            />
            <label :for="`done_${task.id}`">
              <font-awesome-icon icon="check" />
            </label>
          </div>
          <button
            type="button"
            class="note-buttons__item note-buttons__item--detele"
            @click="deleteTask"
          >
            <font-awesome-icon :icon="['far', 'trash-alt']" />
          </button>
        </div>
      </div>
    </div>
    <NoteButtons @createTask="createTask" :noteID="noteID" />
    <NoteButtonsMobile @createTask="createTask" :noteID="noteID" />
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import NoteButtons from "@/components/NoteButtons.vue";
import NoteButtonsMobile from "@/components/NoteButtonsMobile.vue";

export default {
  props: ["noteID"],
  data() {
    return {
      note: { name: "", tasks: [] },
      dragToRefresh: {
        type: "horizontal",
        swipeOut: true,
        swipeOutBy: "25%",
        swipeOutThreshold: "25%"
      }
    };
  },
  methods: {
    createTask(newTask) {
      this.note.tasks.push(newTask);
    },
    deleteTask(index) {
      this.note.tasks.splice(index, 1);
    },
    submit: function() {
      // Removal of empty tasks
      const note = this.note;
      note.tasks.forEach(element => {
        if (!element.name) {
          const index = note.tasks.indexOf(element);
          if (index >= 0) note.tasks.splice(index, 1);
        }
      });

      this.$store.commit("updateNote", {
        id: this.noteID,
        name: note.name,
        tasks: note.tasks
      });
    }
  },
  mounted() {
    const notes = this.getNote;
    if (notes) {
      this.note.name = notes.name;
      this.note.tasks = notes.tasks;
    }
  },
  computed: {
    ...mapGetters(["getNoteByID"]),
    getNote() {
      return this.getNoteByID(this.noteID);
    }
  },
  components: {
    NoteButtons,
    NoteButtonsMobile
  }
};
</script>


<style lang="scss" scoped>
.note {
  background-color: $white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 5px 6px 0px #d6d6d6;
  &-input {
    border: none;
    padding: 0;
    width: 100%;
    background-color: inherit;
    line-height: $line-height-md;
  }
  &-name {
    font-size: $font-size-lg;
    border-bottom: 1px solid #ededed;
    padding: 10px 0;
    & input {
      font-size: $font-size-lg;
    }
  }
  &-tasks {
    &__item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-column-gap: 10px;
      position: relative;
      &:last-child {
        margin-bottom: 0;
      }
      &-element {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &-name {
        background-color: $gray-300;
        border-radius: 5px;
        padding: 10px;
        position: relative;
        z-index: 2;
        border: 1px solid #ededed;
        &.note-tasks__item-element--active {
          border: 1px solid $primary;
          & .note-input {
            opacity: 0.3;
          }
        }
      }
      &-checkbox {
        & input {
          display: none;
          &:checked + label svg {
            display: block;
          }
        }
        & label {
          width: 30px;
          height: 30px;
          background-color: $gray-300;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          & svg {
            display: none;
            color: $primary;
          }
        }
      }
      &-delete {
        width: 30px;
        height: 30px;
        background-color: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        color: $primary;
        & svg {
          cursor: pointer;
        }
      }
    }
  }
  &-buttons {
    position: absolute;
    top: 0;
    z-index: 1;
    background: linear-gradient(to right, green 50%, red 50%);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    &__item {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &--checkbox {
        & input {
          display: none;
          &:checked + label svg {
            display: block;
          }
        }
        & label {
          width: 30px;
          height: 30px;
          background-color: $gray-300;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          margin-left: -80px;
          & svg {
            display: none;
            width: 20px;
            height: 20px;
            & path {
              color: $primary;
            }
          }
        }
      }
      &--detele {
        border: none;
        background-color: initial;
        svg {
          margin-right: -80px;
        }
      }
      &--edit {
        & svg {
          margin-left: -80px;
        }
      }
      & svg {
        width: 25px;
        height: 25px;
        & path {
          color: $white;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .note {
    width: auto;
  }
  .note-tasks__item {
    display: block;
  }
  .note-buttons {
    display: flex !important;
  }
}
</style>