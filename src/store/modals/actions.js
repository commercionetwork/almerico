/**
 * Modals actions
 */
export default {
  /**
   * Action to add modal
   *
   * @param {Function} commit
   * @param {Modal} modal
   */
  addModal({ commit }, modal) {
    commit("addModal", modal);
  },
  /**
   * Action to remove last modal
   *
   * @param {Function} commit
   */
  removeLastModal({ commit }) {
    commit("removeLastModal");
  },
  /**
   * Action to remove all modals
   *
   * @param {Function} commit
   */
  removeAllModals({ commit }) {
    commit("removeAllModals");
  }
};
