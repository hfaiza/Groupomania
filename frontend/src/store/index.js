import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    loggedIn: false,
    token: '',
    userId: '',
    admin: false,
    exp: ''
  },
  mutations: {
    ADD_TOKEN (state, token) {
      state.token = token
      if (state.token) {
        state.loggedIn = true
      } else {
        state.loggedIn = false
      }
    },
    ADD_USER_DATA (state, data) {
      state.userId = data.userId
      state.admin = data.admin
      state.exp = data.exp
    },
    RESET_STATE (state) {
      state.loggedIn = false
      state.token = ''
      state.userId = ''
      state.admin = false
      state.exp = ''
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('ADD_TOKEN', token)
    },
    setUserData ({ commit }, user) {
      commit('ADD_USER_DATA', user)
    }
  },
  plugins: [createPersistedState()]
})
