import Vue from 'vue'

export default {
  actions: {
    async startApp(ctx) {
      if (Vue.localStorage.get('notes'))
        ctx.commit('lsToNote')
      else
        ctx.commit('updateLS')
    },
  },
  mutations: {
    lsToNote(state) {
      const notes = JSON.parse(Vue.localStorage.get('notes'))
      state.notes = notes
    },

    updateLS(state) {
      Vue.localStorage.set('notes', '')
      if (state.notes)
        Vue.localStorage.set('notes', JSON.stringify(state.notes))
    },

    updateNote(state, newNote) {
      const note = state.notes.find(({ id }) => id == newNote.id),
        indexLastNote = state.notes.indexOf(state.notes[state.notes.length - 1]),
        index = (state.notes.indexOf(note) >= 0) ? state.notes.indexOf(note) : ((indexLastNote >= 0) ? indexLastNote : 0)
      state.notes[index] = newNote
      this.commit('updateLS')

    },

    deleteNote(state, noteID) {
      const note = state.notes.find(({ id }) => id == noteID),
        index = state.notes.indexOf(note);
      state.notes.splice(index, 1)
      this.commit('updateLS')
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