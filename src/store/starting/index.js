/**
 * STARTING STATE
 * 
 * @typedef {Object} StartingState
 * @property {Boolean} isLoading
 * @property {Object} genesis
 * @property {Object} nodeInfo
 * @property {Object} pool
 * @property {String} error
 */

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const initialState = {
  error: "",
  genesis: null,
  isLoading: false,
  nodeInfo: null,
  pool: null,
};

export default {
  namespaced: true,
  initialState,
  state: {
    ...initialState
  },
  actions,
  getters,
  mutations,
};