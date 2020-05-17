<template>
  <div class="notes">
    <div class="note" v-for="(note, index) in notes" :key="index">
      <div class="note-header">
        <div class="note-header__name">{{note.name}}</div>
        <div class="note-header__right">
          <router-link
            :to="{name: 'updateNote', params: {id: note.id}}"
            class="note-header__icon note-header__edit"
          >
            <font-awesome-icon :icon="['far', 'edit']" />
          </router-link>
          <div class="note-header__icon note-header__trash">
            <font-awesome-icon :icon="['far', 'trash-alt']" @click="showDelete(note.id)" />
            <transition name="fade">
              <div class="confirm-deletion" v-if="showConfirm[note.id]">
                <p>Are you sure you want to delete note?</p>
                <div class="confirm-deletion__button">
                  <div
                    class="confirm-deletion__button-cancel btn"
                    @click="hiddenDelete(note.id)"
                  >Cancel</div>
                  <div
                    class="confirm-deletion__button-confirm btn btn--primary"
                    @click="deleteNote(note.id)"
                  >Confirm</div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <hr />
      <ul class="note__tasks">
        <li class="note__tasks-item" v-for="(task, i) in note.tasks.slice(0, 2)" :key="i">
          <span>{{task.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirm: []
    };
  },
  methods: {
    showDelete(id) {
      this.showConfirm = [];
      this.$set(this.showConfirm, id, true);
    },
    hiddenDelete(id) {
      this.showConfirm = [];
      this.$set(this.showConfirm, id, false);
    },
    deleteNote(id) {
      this.$store.commit("deleteNote", id);
      this.showConfirm = [];
    }
  },
  computed: {
    notes() {
      return this.$store.getters["allNotes"];
    }
  }
};
</script>

<style lang="scss">
.notes {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  & .note {
    background-color: $white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 3px 4px #e4e4e4;
    &-header {
      display: flex;
      justify-content: space-between;
      &__name {
        font-size: $font-size-lg;
      }
      &__right {
        display: flex;
        align-items: center;
      }
      &__edit {
        margin-right: 10px;
      }
      &__icon {
        & svg {
          color: $black;
          font-size: $font-size-base;
          cursor: pointer;
          &:hover {
            color: $primary;
          }
        }
      }
      &__trash {
        position: relative;
      }
    }
    &__tasks {
      padding: 0 20px;
      &-item {
        color: $primary;
        & span {
          color: $black;
        }
      }
    }
  }
}
</style>