import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    loggedIn: false,
    token: "",
    userId: "",
    admin: false,
  },
  mutations: {
    ADD_TOKEN(state, token) {
      state.token = token;
      if (state.token) {
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    },
    ADD_USER_ID(state, userId) {
      state.userId = userId;
    },
    ADD_ADMIN(state, admin) {
      state.admin = admin;
    },
    RESET_STATE(state) {
      state.loggedIn = false;
      state.token = "";
      state.userId = "";
      state.admin = false;
    },
  },
  actions: {
    addToken({ commit }, token) {
      commit("ADD_TOKEN", token);
    },
    addUserId({ commit }, userId) {
      commit("ADD_USER_ID", userId);
    },
    addAdmin({ commit }, admin) {
      commit("ADD_ADMIN", admin);
    },
  },
  plugins: [createPersistedState()],
});
