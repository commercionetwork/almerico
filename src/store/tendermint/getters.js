/**
 * Tendermint getters
 */

export default {
  blocks: state => state.blocks,
  lastBlock: state => state.lastBlock,
  transactions: state => state.transactions,
  isFetching: state => state.isFetching,
  message: state => state.message,
};
