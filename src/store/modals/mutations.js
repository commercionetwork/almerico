/**
 * Modals mutations
 */
export default {
  /**
   * Add modal data
   *
   * @param {ModalsState} state
   * @param {Modal} modal
   */
  addModal(state, modal) {
    state.all.push(modal);
  },
  /**
   * Remove last modal
   *
   * @param {ModalsState} state
   */
  removeLastModal(state) {
    state.all.pop();
  },
  /**
   * Remove all modals
   *
   * @param {ModalsState} state
   */
  removeAllModals(state) {
    state.all = [];
  }
};
