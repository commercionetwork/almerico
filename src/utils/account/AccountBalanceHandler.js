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
    let availables = 0,
      delegations = 0,
      rewards = 0,
      unbondings = 0;

    if (this.balances && this.balances.length > 0)
      availables = sumAmounts(this.balances, 'amount');

    if (this.delegations && this.delegations.length > 0)
      delegations = sumAmounts(this.delegations, 'shares');

    if (this.rewards && this.rewards.total && this.rewards.total.length > 0)
      rewards = sumAmounts(this.rewards.total, 'amount');

    if (this.unbondings && this.unbondings.length > 0)
      this.unbondings.forEach((unbonding) => {
        unbondings = sumAmounts(unbonding.entries, 'balance');
      });

    this.clear;
    return {
      availables,
      delegations,
      rewards,
      unbondings,
      total: availables + delegations + rewards + unbondings,
    };
  }
}

const sumAmounts = (items, prop) =>
  items.reduce((acc, item) => acc + parseInt(item[prop]), 0);

export default new AccountBalanceHandler();
