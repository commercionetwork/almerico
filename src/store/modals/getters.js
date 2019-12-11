/**
 * Modals getters
 */
export default {
  hasModal: state => !!state.all.length,
  lastModal: state => state.all[state.all.length - 1]
};
