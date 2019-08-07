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
    page = 1,
    limit = 20
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
    page = 1,
    limit = 20
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
   * @param {Object} filters // status, page, limit
   */
  async fetchValidators({
    commit
  }, filters) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestValidators(filters);
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
  }
};
