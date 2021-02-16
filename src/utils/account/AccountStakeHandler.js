class AccountStakeHandler {
  constructor() {
    this.clear();
  }

  clear() {
    this.delegations = null;
    this.rewards = null;
    this.unbondings = null;
  }

  setDelegations(delegations) {
    this.delegations = delegations;
    return this;
  }

  setRewards(rewards) {
    this.rewards = rewards;
    return this;
  }

  setUnbondings(unbondings) {
    this.unbondings = unbondings;
    return this;
  }

  get() {
    let delegations = 0,
      rewards = 0,
      unbondings = 0;

    if (this.delegations && this.delegations.length > 0) {
      delegations = sumAmounts(this.delegations, 'shares');
    }

    if (this.rewards && this.rewards.total && this.rewards.total.length > 0) {
      rewards = sumAmounts(this.rewards.total, 'amount');
    }

    if (this.unbondings && this.unbondings.length > 0) {
      for (const unbonding of this.unbondings) {
        unbondings += sumAmounts(unbonding.entries, 'balance');
      }
    }

    this.clear;
    return {
      delegations,
      unbondings,
      rewards,
      total: delegations + rewards + unbondings,
    };
  }
}

const sumAmounts = (items, prop) =>
  items.reduce((acc, item) => acc + parseFloat(item[prop]), 0);

export default new AccountStakeHandler();
