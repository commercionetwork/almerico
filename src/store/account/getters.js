/**
 * Account getters
 */

export default {
  balances: state => state.all,
  isFetching: state => state.isFetching,
  message: state => state.message,
};
