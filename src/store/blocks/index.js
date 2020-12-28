/**
 * BLOCKS STATE
 * 
 * @typedef {Object} BlocksState
 * @property {Array.<Object>} blocks
 * @property {Boolean} isLoading
 * @property {Number} currentHeight
 * @property {Object} details
 * @property {Object} latest
 * @property {String} error
 */

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const initialState = {
  blocks: [],
  currentHeight: 1,
  details: null,
  error: "",
  isLoading: false,
  latest: null,
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