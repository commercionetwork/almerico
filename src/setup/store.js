import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const initialState = {};

export default new Vuex.Store({
  modules: {},
  state: {
    serverReachability: true
  },
  getters: {
    getServerReachability: state => state.serverReachability
  },
  mutations: {
    /**
     * Reset all the store
     * 
     * @param {state} state 
     */
    reset(state) {
      Object.keys(state).forEach(key => {
        Object.assign(state[key], initialState[key]);
      });
    },
    /**
     * Set the server reachability
     * 
     * @param {state} state 
     * @param {boolean} payload 
     */
    setServerReachability(state, payload) {
      state.serverReachability = payload;
    }
  }
});
