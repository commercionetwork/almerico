/**
 * Account getters
 */

export default {
  balances: state => state.balances,
  delegations: state => state.delegations,
  isFetching: state => state.isFetching,
  membership: state => state.membership,
  message: state => state.message,
  rewards: state => state.rewards,
  unbondingDelegations: state => state.unbondingDelegations,
};
