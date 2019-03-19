export const state = () => ({
     user: ''
  })
  
  export const mutations = {
    setUser (state, user) {
      state.user = user
   }
  }

  export const actions = {
    async nuxtServerInit({commit},{ app }) {
      const res = await app.$axios.get('/user')
      commit('setUser',res.data.data)
    },

    async setUser({commit},data){
      commit('setUser',data)
    }
  }


