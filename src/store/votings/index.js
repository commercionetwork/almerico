import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

/**
 * Votings state
 *
 * @typedef {Object} VotingsState
 * @property {boolean} isFetching
 */
export const initialState = {
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
