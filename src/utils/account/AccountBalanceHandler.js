class AccountBalanceHandler {
  constructor() {
    this.clear();
  }

  clear() {
    this.balances = null;
    this.delegations = null;
    this.rewards = null;
    this.unbondings = null;
  }

  setBalances(balances) {
    this.balances = balances;
    return this;
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
    let amounts = {
      availables: 0,
      delegations: 0,
      unbondings: 0,
      rewards: 0,
      total: 0,
    };

    if (this.balances && this.balances.length > 0) this.balances.forEach(balance => amounts['availables'] += parseFloat(balance['amount']));
    if (this.delegations && this.delegations.length > 0) this.delegations.forEach(delegation => amounts['delegations'] += parseFloat(delegation['shares']));
    if (this.unbondings && this.unbondings.length > 0) this.unbondings.forEach(unbonding => {
      unbonding.entries.forEach(entry => amounts['unbondings'] += parseFloat(entry['balance']))
    });
    if (this.rewards && this.rewards.total && this.rewards.total.length > 0) this.rewards.total.forEach(reward => amounts['rewards'] += parseFloat(reward['amount']));
    
    amounts['total'] = amounts['availables'] +
      amounts['delegations'] +
      amounts['rewards'] +
      amounts['unbondings'];

    this.clear;
    return amounts;
  }
}

export default new AccountBalanceHandler();