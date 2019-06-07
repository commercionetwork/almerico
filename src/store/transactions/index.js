import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

/**
 * Transactions state
 *
 * @typedef {Object} TransactionsState
 * @property {Array.<Transaction>} all
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
