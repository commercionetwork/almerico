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
    const capital = { delegations: 0, unbondings: 0, rewards: 0 };
    if (this.delegations && this.delegations.length > 0) {
      capital.delegations = this.delegations.reduce(
        (acc, item) => acc + parseFloat(item.balance.amount),
        0
      );
    }
    if (this.rewards && this.rewards.total && this.rewards.total.length > 0) {
      capital.rewards = this.rewards.total.reduce(
        (acc, item) => acc + parseFloat(item.amount),
        0
      );
    }
    if (this.unbondings && this.unbondings.length > 0) {
      for (const unbonding of this.unbondings) {
        capital.unbondings += unbonding.entries.reduce(
          (acc, item) => acc + parseFloat(item.balance),
          0
        );
      }
    }
    capital.total = capital.delegations + capital.unbondings + capital.rewards;
    
    this.clear;
    return capital;
  }
}

export default new AccountStakeHandler();
