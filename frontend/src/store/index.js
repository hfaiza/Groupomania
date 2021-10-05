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
    ADD_TOKEN(state, payload) {
      state.token = payload;
    },
    ADD_USER_ID(state, payload) {
      state.userId = payload;
    },
    ADD_ADMIN(state, payload) {
      state.admin = payload;
    },
    CHECK_USER_STATUS(state) {
      if (state.token) {
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    },
    RESET_STATE(state) {
      (state.loggedIn = false), (state.token = ""), (state.userId = "");
    },
  },
  plugins: [createPersistedState()],
});
