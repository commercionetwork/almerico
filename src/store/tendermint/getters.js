/**
 * Tendermint getters
 */

export default {
  genesis: state => state.genesis,
  isFetching: state => state.isFetching,
  message: state => state.message
};
