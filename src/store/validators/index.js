import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

/**
 * Validators state
 *
 * @typedef {Object} ValidatorsState
 * @property {Array.<Validator>} all
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
