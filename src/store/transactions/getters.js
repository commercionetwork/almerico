/**
 * Transactions getters
 */

export default {
  transactions: state => state.all,
  isFetching: state => state.isFetching,
  message: state => state.message,
};
