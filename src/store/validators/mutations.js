/**
 * VALIDATORS MUTATIONS
 */

export default {
  /**
   * Set isLoading state to true
   *
   * @param {ValidatorsState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   * Set isLoading state to false
   *
   * @param {ValidatorsState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   * Set error message
   *
   * @param {ValidatorsState} state
   * @param {Object} error
   */
  setError(state, error) {
    state.error = { ...error };
  },
  /**
   * Set validators filter
   *
   * @param {ValidatorsState} state
   * @param {Object} data
   */
  setFilter(state, data) {
    state.filter = {
      ...data,
    };
  },
  /**
   * Set validators
   *
   * @param {ValidatorsState} state
   * @param {Array.<Object>} data
   */
  setValidators(state, data) {
    state.validators = data.map((obj) => ({
      ...obj,
    }));
  },
  /**
   * Add validators
   *
   * @param {ValidatorsState} state
   * @param {Array.<Object>} data
   */
  addValidators(state, data) {
    state.validators.push.apply(state.validators, data);
  },
  /**
   * Set validators sets for a certain height
   *
   * @param {ValidatorsState} state
   * @param {Array.<Object>} data
   */
  setHeightValidatorsSets(state, data) {
    state.heightValidatorsSets = data.map((obj) => ({
      ...obj,
    }));
  },
  /**
   * Set latest validators sets
   *
   * @param {ValidatorsState} state
   * @param {Array.<Object>} data
   */
  setLatestValidatorsSets(state, data) {
    state.latestValidatorsSets = [];
    state.latestValidatorsSets = data.map((obj) => ({
      ...obj,
    }));
  },
  /**
   * Set validator details
   *
   * @param {ValidatorsState} state
   * @param {Object} data
   */
  setDetails(state, data) {
    state.details = null;
    state.details = {
      ...data,
    };
  },
  /**
   * Add details to validator details
   *
   * @param {ValidatorsState} state
   * @param {Object} data
   */
  addDetails(state, data) {
    state.details = {
      ...state.details,
      ...data,
    };
  },
  /**
   * Reset validator details
   *
   * @param {ValidatorsState} state
   */
  resetDetails(state) {
    for (let key in state.details) {
      delete state.details[key];
    }
  },
};
