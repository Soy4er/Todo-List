<template>
  <div class="notes">
    <div class="note" v-for="(note, index) in notes" :key="index">
      <div class="note-content" v-swipeable="dragToRefresh" @swiped="toggleDeletePanel(note.id)">
        <div class="note-header">
          <router-link :to="{name: 'updateNote', params: {id: note.id}}" class="note-header__name">{{note.name}}</router-link>
          <div class="note-header__buttons d-flex">
            <div class="note-header__icon p-relative">
              <font-awesome-icon :icon="['far', 'trash-alt']" @click="toggleDeletePanel(note.id)" />
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
      <div class="note-delete">
        <font-awesome-icon :icon="['far', 'trash-alt']" @click="toggleDeletePanel(note.id)" />
      </div>
      <transition name="fade">
        <div class="confirmation-panel" v-if="showConfirmDeletion[note.id]">
          <p>Are you sure you want to delete note?</p>
          <div class="confirmation-panel__buttons">
            <div
              class="confirmation-panel__buttons-cancel btn"
              @click="toggleDeletePanel(note.id)"
            >Cancel</div>
            <div
              class="confirmation-panel__buttons-confirm btn btn--primary"
              @click="deleteNote(note.id)"
            >Confirm</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showConfirmDeletion: [],
      dragToRefresh: {
        type: 'horizontal',
        swipeOut: false,
        allowedDirection: 'left',
        swipeOutBy: '65px',
        swipeOutThreshold: '65px',
        max: '65px',
      },
    };
  },
  methods: {
    toggleDeletePanel(id) {
      this.$set(this.showConfirmDeletion, id, this.showConfirmDeletion[id] ? false : true);
    },
    deleteNote(id) {
      this.$store.commit("deleteNote", id);
      this.showConfirmDeletion = [];
    }
  },
  computed: {
    ...mapGetters({ notes: "getNotes" })
  }
};
</script>

<style lang="scss" scoped>
.notes {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  & .note {
    position: relative;
    &-delete {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: red;
      border-radius: 13px;
      & svg {
        position: absolute;
        top: calc(50% - 12.5px);
        right: 20px;
        width: 25px;
        height: 25px;
        & path {
          fill: $white;
        }
      }
    }
    &-content {
      position: relative;
      z-index: 1;
      height: 100%;
      background-color: $white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 3px 4px #e4e4e4;
    }
    &-header {
      display: flex;
      justify-content: space-between;
      &__name {
        color: $black;
        font-size: $font-size-lg;
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
    }
    &__tasks {
      padding-left: 20px;
      &-item {
        color: $primary;
        & span {
          color: $black;
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .notes {
    grid-template-columns: 1fr 1fr;
    & .note {
      &-header {
        &__buttons {
          display: none;
        }
      }
    }
  }
}
@media screen and (max-width: 576px) {
  .notes {
    grid-template-columns: 1fr;
    margin-bottom: 100px;
    & .note {
      &-header {
        &__name {
          font-size: $font-size-base;
        }
        &__buttons {
          display: none;
        }
      }
    }
  }
}
</style>