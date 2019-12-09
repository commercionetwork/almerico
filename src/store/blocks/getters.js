/**
 * Blocks getters
 */

export default {
  blocks: state => state.all,
  lastBlock: state => state.last,
  isFetching: state => state.isFetching,
  message: state => state.message,
};
