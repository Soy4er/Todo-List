<template>
  <div class="create-note">
    <button class="create-note__button" @click="goToCreateNote">
      <font-awesome-icon icon="plus" />
      <span>Create note</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    goToCreateNote() { this.$router.push({ name: "updateNote", params: { id: this.countNotes + 1 } }) }
  },
  computed: {
    ...mapGetters([ 'countNotes' ])
  }
};
</script>

<style lang="scss" scoped>
.create-note {
  position: fixed;
  bottom: 50px;
  left: 50px;
  z-index: 10;
  &__button {
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
    &:hover {
      width: 155px;
    }
  }
}

@media (max-width: 992px) {
  .create-note {
    bottom: 20px;
    left: 20px;
  }
}
@media (max-width: 768px) {
  .create-note {
    background-color: #efefef;
    width: calc(100% - 30px);
    left: 15px;
    height: 50px;
    border-radius: 20px;
    box-shadow: 0 3px 4px #e4e4e4;
    &__button {
      position: absolute;
      bottom: 10px;
      left: calc(50% - 25px);
      box-shadow: 0 3px 4px #888888;
    }
  }
}
</style>