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
    ADD_USER_ID (state, userId) {
      state.userId = userId
    },
    ADD_ADMIN (state, admin) {
      state.admin = admin
    },
    ADD_EXP_DATE (state, date) {
      state.exp = date
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
    setUserId ({ commit }, userId) {
      commit('ADD_USER_ID', userId)
    },
    setAdmin ({ commit }, admin) {
      commit('ADD_ADMIN', admin)
    },
    setExpirationDate ({ commit }, date) {
      commit('ADD_EXP_DATE', date)
    }
  },
  plugins: [createPersistedState()]
})
