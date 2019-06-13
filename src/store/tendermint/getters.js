/**
 * Tendermint getters
 */

export default {
  blocks: state => state.blocks,
  transactions: state => state.transactions,
  isFetching: state => state.isFetching,
  message: state => state.message,
};
