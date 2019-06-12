import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

/**
 * Blocks state
 *
 * @typedef {Object} BlocksState
 * @property {Array.<Block>} all
 * @property {boolean} isFetching
 */
export const initialState = {
  all: [],
  isFetching: false,
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
