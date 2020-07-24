/**
 * Validators actions
 */

import api from "./api";
import {
  VALIDATOR_STATUS
} from "Constants";

export default {
  /**
   * Action to get the validators list
   * 
   * @param {Function} commit 
   * @param {Function} dispatch
   * @param {Array.<String>} status
   * @param {Number} page
   * @param {Number} limit
   */
  getValidators({
    commit,
    dispatch
  }, {
    status = [VALIDATOR_STATUS.BONDED],
    page,
    limit
  } = {}) {
    commit("setValidators", []);
    [...status].forEach(element => dispatch("fetchValidators", {
      status: element,
      page,
      limit
    }));
  },
  /**
   * Action to add validators to the list
   * 
   * @param {Function} dispatch
   * @param {Array.<String>} status
   * @param {Number} page
   * @param {Number} limit
   */
  addValidators({
    dispatch
  }, {
    status = [VALIDATOR_STATUS.BONDED],
    page,
    limit
  } = {}) {
    [...status].forEach(element => dispatch("fetchValidators", {
      status: element,
      page,
      limit
    }));
  },
  /**
   * Action to fetch a validators list
   * 
   * @param {Function} commit 
   * @param {Object} filter // status, page, limit
   */
  async fetchValidators({
    commit
  }, filter) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestValidators(filter);
      if (response.data.result.length > 0) commit("addValidators", response.data.result);
    } catch (error) {
      if (error.response) {
        commit("setMessage", error.response.data.error);
      } else if (error.request) {
        commit("setMessage", "Request error");
      } else {
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  },
  /**
   * Action to fetch last validator set
   * 
   * @param {Function} commit 
   */
  async fetchLastValidatorSet({
    commit
  }) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestValidatorsetsLatest();
      const data = response.data.result.validators;
      commit("setValidatorSet", data);
    } catch (error) {
      if (error.response) {
        commit("setMessage", error.response.data.error);
      } else if (error.request) {
        commit("setMessage", "Request error");
      } else {
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  }
};
