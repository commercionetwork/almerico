/**
 * STARTING STATE
 * 
 * @typedef {Object} StartingState
 * @property {Boolean} isLoading
 * @property {Object} nodeInfo
 * @property {Object} params
 * @property {Object} pool
 * @property {String} error
 */

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const initialState = {
  error: "",
  isLoading: false,
  nodeInfo: null,
  params: null,
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