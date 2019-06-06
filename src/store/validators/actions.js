import api from "./api";

/**
 * Validators actions
 */
export default {
  /**
   * Action to get the validators list
   * 
   * @param {Function} dispatch
   * @param {Object} filter 
   */
  getValidators({
    dispatch
  }, status, page, limit) {
    dispatch("fetchValidatorsList", status, page, limit);
  },
  /**
   * Action to fetch a validators list
   * 
   * @param {Function} commit 
   * @param {Object} filter 
   */
  async fetchValidatorsList({
    commit
  }, status, page, limit) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestValidators(status, page, limit);
      commit("setValidators", response.data);
    } catch (error) {
      if (error.response !== undefined) {
        console.log(error.response);
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
