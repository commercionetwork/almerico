export default {
  /**
   *
   * @param {import(".").ValidatorsState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   *
   * @param {import(".").ValidatorsState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   *
   * @param {import(".").ValidatorsState} state
   * @param {Object} data
   */
  setFilter(state, data) {
    state.filter = {
      ...data,
    };
  },
  /**
   *
   * @param {import(".").ValidatorsState} state
   * @param {Array.<Object>} data
   */
  setValidators(state, data) {
    state.validators = data;
  },
  /**
   *
   * @param {import(".").ValidatorsState} state
   * @param {Array.<Object>} data
   */
  addValidators(state, data) {
    state.validators.push(...data);
  },
  /**
   *
   * @param {import(".").ValidatorsState} state
   * @param {Object} pagination
   */
  setPagination(state, pagination) {
    state.pagination = pagination;
  },
  /**
   *
   * @param {import(".").ValidatorsState} state
   * @param {Array.<Object>} data
   */
  setHeightValidatorsSets(state, data) {
    state.heightValidatorsSets = data.map((obj) => ({
      ...obj,
    }));
  },
  /**
   *
   * @param {import(".").ValidatorsState} state
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
   * @param {import(".").ValidatorsState} state
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
   * @param {import(".").ValidatorsState} state
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
   * @param {import(".").ValidatorsState} state
   */
  resetDetails(state) {
    for (let key in state.details) {
      delete state.details[key];
    }
  },
};
