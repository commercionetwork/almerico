export default {
  /**
   *
   * @param {ValidatorsState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   *
   * @param {ValidatorsState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
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
   *
   * @param {ValidatorsState} state
   * @param {Array.<Object>} data
   */
  addValidators(state, data) {
    state.validators.push.apply(state.validators, data);
  },
  /**
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
   *
   * @param {ValidatorsState} state
   */
  resetDetails(state) {
    for (let key in state.details) {
      delete state.details[key];
    }
  },
};
