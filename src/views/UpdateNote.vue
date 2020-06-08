<template>
  <main>
    <div class="container">
      <h1 class="title text-center mt-50 mb-10">{{`${this.getNote ? 'Update' : 'Create'} Note`}}</h1>
      <FormNote :noteID="noteID" />
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import FormNote from "@/components/FormNote.vue";

export default {
  data() {
    return {
      noteID: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters(["getNoteByID"]),
    getNote() { return this.getNoteByID(this.noteID); }
  },
  components: {
    FormNote
  }
};
</script>
