import api from "./api";

/**
 * Transactions  actions
 */
export default {
  /**
   * 
   * @param {Function} dispatch 
   * @param {Object} filters // tag, page, limit
   */
  getTransactions({
    dispatch
  }, filters) {
    dispatch("fetchTransactions", filters);
  },
  /**
   * 
   * @param {Function} commit 
   * @param {Object} filters // tag, page, limit
   */
  async fetchTransactions({
    commit
  }, filters) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestTransactions(filters);
      commit("setTransactions", response.data);
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
  },
  /**
   * 
   * @param {Function} commit 
   * @param {Object} filters // tag, page, limit
   */
  async updateTransactions({
    commit
  }, filters) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestTransactions(filters);
      commit("addTransactions", response.data);
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
