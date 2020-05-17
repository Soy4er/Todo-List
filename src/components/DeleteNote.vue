<template>
  <div>
    <transition name="fade">
      <div class="confirm-deletion" v-if="show">
        <p>Are you sure you want to delete item?</p>
        <div class="confirm-deletion__button">
          <div class="confirm-deletion__button-cancel btn" @click="show = false">Cancel</div>
          <div
            class="confirm-deletion__button-confirm btn btn--primary"
            @click="deleteNote(note.id)"
          >Confirm</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['show']
}
</script>