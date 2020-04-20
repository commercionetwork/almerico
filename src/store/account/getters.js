/**
 * Account getters
 */

export default {
  balances: state => state.all,
  isFetching: state => state.isFetching,
  membership: state => state.membership,
  message: state => state.message,
};
