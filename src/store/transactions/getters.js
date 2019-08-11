/**
 * Transactions getters
 */

export default {
  transactions: state => state.all,
  details: state => state.details,
  isFetching: state => state.isFetching,
  message: state => state.message,
};
