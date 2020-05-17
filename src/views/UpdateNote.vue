<template>
  <div class="container">
    <div class="update-note">
      <h1>{{`${type} Note`}}</h1>

      <form @submit.prevent="submit">
        <div class="update-note__name-note">
          <input
            type="text"
            name="noteName"
            id="noteName"
            required
            v-model="noteNameValue"
            class="update-note__input"
            placeholder="Note name"
          />
        </div>
        <div class="update-note__tasks">
          <div class="update-note__task" v-for="(task, index) in tasks" :key="index">
            <div class="update-note__task-checkbox">
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
            <div class="update-note__task-name">
              <input
                type="text"
                :name="`name_${task.id}`"
                :id="`name_${task.id}`"
                v-model="task.name"
                class="update-note__input"
                placeholder="Task name"
              />
            </div>
            <div class="update-note__task-delete" @click="deleteTask(index)">
              <div>
                <font-awesome-icon icon="times" />
              </div>
            </div>
          </div>
        </div>

        <div class="buttons">
          <router-link :to="{name: 'home'}" class="buttons__goback buttons__item">
            <font-awesome-icon icon="long-arrow-alt-left" />Go back to the main page
          </router-link>
          <div class="buttons__task-create buttons__item" @click="createTask">
            <font-awesome-icon icon="plus" />Create a new task
          </div>
          <div class="buttons__undo buttons__item" @click="showUndo = !showUndo">
            <font-awesome-icon icon="undo-alt" />Undo changes to a note
          </div>
          <transition name="fade">
            <div class="confirm-deletion" v-if="showUndo">
              <p>Are you sure you want to undo the changes?</p>
              <div class="confirm-deletion__button">
                <div class="confirm-deletion__button-cancel btn" @click="showUndo = false">Cancel</div>
                <div
                  class="confirm-deletion__button-confirm btn btn--primary"
                  @click="undoChanges"
                >Confirm</div>
              </div>
            </div>
          </transition>
          <div
            class="buttons__note-trash buttons__item"
            @click="show = !show"
            v-if="this.note"
          >
            <font-awesome-icon :icon="['far', 'trash-alt']" />Delete a note
          </div>
          <transition name="fade">
            <div class="confirm-deletion" v-if="show">
              <p>Are you sure you want to delete note?</p>
              <div class="confirm-deletion__button">
                <div class="confirm-deletion__button-cancel btn" @click="show = false">Cancel</div>
                <div
                  class="confirm-deletion__button-confirm btn btn--primary"
                  @click="deleteNote"
                >Confirm</div>
              </div>
            </div>
          </transition>
          <button type="submit" class="buttons__note-save buttons__item">
            <font-awesome-icon icon="check" />Save a note
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noteID: this.$route.params.id,
      noteNameValue: "",
      tasks: [],
      show: false,
      showUndo: false
    };
  },
  methods: {
    undoChanges() {
      if (this.note) {
        this.noteNameValue = this.note.name;
        this.tasks = Array.from(this.note.tasks);
      } else {
        this.noteNameValue = '';
        this.tasks = [];
      }
      this.showUndo = false;
    },
    createTask() {
      const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 0 ;
      this.tasks.push({ id, name: "", done: false });
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    deleteNote() {
      this.$store.commit("deleteNote", this.noteID);
      this.$router.push({ name: "home" });
    },
    submit: function() {
      // Удаление пустых тасков
      this.tasks.forEach(element => {
        if (element.name === "") {
          const index = this.tasks.indexOf(element)
          if (index >= 0) {
            this.tasks.splice(index, 1);
          }
        }
      });

      const note = {
        id: this.noteID,
        name: this.noteNameValue,
        tasks: this.tasks
      };
      this.$store.commit("updateNote", note);
    }
  },
  async mounted() {
    if (this.note) {
      this.noteNameValue = this.note.name;
      this.tasks = Array.from(this.note.tasks);
    }
  },
  computed: {
    type() {
      return this.note ? "Update" : "Create";
    },
    note() {
      return this.$store.getters["allNotes"].find(
        ({ id }) => id == this.noteID
      );
    }
  }
};
</script>

<style lang="scss">
.buttons {
  position: fixed;
  top: 120px;
  left: 1250px;
  user-select: none;
  outline: none;
  & .confirm-deletion {
    top: 120px;
  }
  &__item {
    width: 30px;
    height: 30px;
    overflow: hidden;
    background-color: #7047f5;
    color: #fff;
    border-radius: 20px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    white-space: nowrap;
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    & svg {
      padding: 0 9px;
    }
  }
  &__task-create:hover {
    width: 165px;
  }
  &__note-trash:hover {
    width: 135px;
  }
  &__note-save {
    & svg {
      padding-left: 0;
    }
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

.update-note {
  margin-top: 50px;
  & h1 {
    font-size: $font-size-xl;
    margin-bottom: 20px;
    text-align: center;
  }
  & form {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    margin: 0 auto;
    box-shadow: 0 5px 6px 0px #d6d6d6;
  }
  &__input {
    border: none;
    padding: 0;
    width: 400px;
    height: 25px;
    border-radius: 5px;
    background-color: #eee;
    padding: 10px;
  }
  &__name-note {
    width: 100%;
    margin-bottom: 0;
    font-size: $font-size-lg;
    & input {
      font-size: $font-size-lg;
      width: calc(100% - 20px);
    }
  }
  &__task {
    display: flex;
    margin-top: 10px;
    &-checkbox {
      display: flex;
      align-items: center;
      & input {
        display: none;
        &:checked + label svg {
          display: block;
        }
      }
      & label {
        width: 30px;
        height: 30px;
        background-color: #eee;
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
    &-name {
      height: 100%;
      margin: 0 10px;
    }
    &-delete {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      & div {
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
}
</style>