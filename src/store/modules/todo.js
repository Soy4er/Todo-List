import Vue from 'vue'
import axios from 'axios'

export default {
  actions: {
    async startApp(ctx) {
      if (!localStorage.getItem('notes')) {
        axios.get('notes.json')
          .then((response) => {
            ctx.commit('updateNotes', response.data)
          })
          .catch((error) => {
            Vue.notify({
              group: 'notification',
              type: 'error',
              title: `Error loading records`,
              text: error.response.data,
              duration: 10000
            })
          });
      } else {
        ctx.commit('updateNotes', JSON.parse(localStorage.getItem('notes')))
      }
    },
  },
  mutations: {
    updateNotes(state, notes) {
      state.notes = notes
      this.commit('updateLocalStorage');
    },

    updateLocalStorage(state) {
      state.notes ? localStorage.setItem('notes', JSON.stringify(state.notes)) : localStorage.clear();
    },

    updateNote(state, note) {
      let notes = state.notes;
      const index = notes.findIndex(({ id }) => id == note.id),
        type = index < 0 ? 'created' : 'updated';

      if (index < 0) 
        notes.push(note);
      else 
        notes[index] = note;

      this.commit('updateLocalStorage');

      Vue.notify({
        group: 'notification',
        type: 'success',
        title: `Note ${type}`,
        text: `The "${note.name}" entry was ${type} successfully!`,
        duration: 10000
      })
    },

    deleteNote(state, noteID) {
      let notes = state.notes;
      const note = notes.find(({ id }) => id == noteID),
        index = notes.indexOf(note);
      notes.splice(index, 1);

      this.commit('updateLocalStorage');

      Vue.notify({
        group: 'notification',
        type: 'success',
        title: 'Deleting a note',
        text: `The "${note.name}" note was successfully deleted!`,
        duration: 10000
      });
    },
  },
  state: {
    notes: [],
  },
  getters: {
    getNotes(state) { return state.notes },
    getNoteByID: (state) => (noteID) => { return state.notes.find(({ id }) => id == noteID) },
    countNotes(state) { return state.notes.length }
  }
}