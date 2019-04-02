export const state = () => ({
  user: '',
  currentNote: {}
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setCurrentNote(state, note) {
    state.currentNote = note
  }
}

export const actions = {
  async nuxtServerInit({commit}, {app}) {
    const res = await app.$axios.get('/user')
    commit('setUser', res.data)
  },

  async setUser({commit}, data) {
    commit('setUser', data)
  },

  async setCurrentNote({commit}, data) {
    commit('setCurrentNote', data)
  }
}


