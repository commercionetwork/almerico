import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

/**
 * Votings state
 *
 * @typedef {Object} VotingsState
 * @property {Array.<Proposal>} all
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
