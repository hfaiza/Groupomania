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
    setUserData ({ commit }, user) {
      commit('ADD_USER_ID', user.userId)
      commit('ADD_ADMIN', user.admin)
      commit('ADD_EXP_DATE', user.exp)
    }
  },
  plugins: [createPersistedState()]
})
