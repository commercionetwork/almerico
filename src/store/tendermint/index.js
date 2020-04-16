/**
 * Tendermint state
 */

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export const initialState = {
  genesis: null,
  isFetching: false,
  message: "",
  nodeInfo: null,
};

export default {
  namespaced: true,
  initialState,
  state: {
    ...initialState
  },
  getters,
  actions,
  mutations
};
