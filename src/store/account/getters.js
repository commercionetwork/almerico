/**
 * ACCOUNT GETTERS
 */

export default {
  balances: state => state.balances,
  delegations: state => state.delegations,
  error: state => state.error,
  isLoading: state => state.isLoading,
  membership: state => state.membership,
  rewards: state => state.rewards,
  unbondings: state => state.unbondings,
};