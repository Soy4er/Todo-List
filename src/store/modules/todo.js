import Vue from 'vue'

export default {
  actions: {
    async startApp(ctx) {
      const type = Vue.localStorage.get('notes') ? 'updateNotes' : 'updateLS' ;
      ctx.commit(type)
    },
  },
  mutations: {
    updateNotes(state) {
      const notes = JSON.parse(Vue.localStorage.get('notes'))
      state.notes = notes
    },

    updateLS(state) {
      Vue.localStorage.set('notes', '')
      Vue.localStorage.set('notes', state.notes ? JSON.stringify(state.notes) : '')
    },

    updateNote(state, note) {
      const index = state.notes.findIndex(({ id }) => id == note.id),
        type = index < 0 ? 'created' : 'updated';

      if (index < 0) {
        state.notes.push(note);
      } else {
        state.notes[index] = note;
      }

      this.commit('updateLS');

      Vue.notify({
        group: 'notification',
        type: 'success',
        title: `Note ${type}`,
        text: `The "${note.name}" entry was ${type} successfully!`,
        duration: 10000
      })
    },

    deleteNote(state, noteID) {
      const note = state.notes.find(({ id }) => id == noteID),
        index = state.notes.indexOf(note);
      state.notes.splice(index, 1);

      this.commit('updateLS');

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
    notes: [
      {
        id: 1,
        name: 'Home page',
        tasks: [
          { id: 1, name: 'To pick up the banners for the main slider', done: true },
          { id: 2, name: 'To develop the array of benefits the company', done: true },
          { id: 3, name: 'Modify the layout of the catalog block and display it on the working site', done: false },
          { id: 4, name: 'Fix the gallery of works and add new works of the company', done: false },
          { id: 5, name: 'Develop a standard version of the feedback form', done: false },
        ],
      },
      {
        id: 2,
        name: 'Contact page',
        tasks: [
          { id: 1, name: 'Change the company address and one of the phone numbers', done: false },
          { id: 2, name: 'Add a feedback form', done: false },
          { id: 3, name: 'Fix the employee slider', done: false },
        ],
      },
      {
        id: 3,
        name: 'Page about the company',
        tasks: [
          { id: 1, name: 'Bring out new employees', done: true },
          { id: 2, name: 'To improve margins at the company history', done: false },
        ],
      },
    ],
  },
  getters: {
    allNotes(state) {
      return state.notes
    },
  }
}