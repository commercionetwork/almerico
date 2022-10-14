const walletBalanceHelper = {
  build({ wallet, bondDenom }) {
    const capital = new Capital();

    if (wallet.balances && wallet.balances.length > 0) {
      capital.availables = _getAvailablesAmount(wallet.balances, bondDenom);
    }
    if (wallet.delegations && wallet.delegations.length > 0) {
      capital.delegations = _getDelegationsAmount(wallet.delegations);
    }
    if (
      wallet.rewards &&
      wallet.rewards.total &&
      wallet.rewards.total.length > 0
    ) {
      capital.rewards = _getRewardsAmount(wallet.rewards.total, bondDenom);
    }
    if (wallet.unbondings && wallet.unbondings.length > 0) {
      capital.unbondings = _getUnbondingsAmount(wallet.unbondings);
    }

    return capital;
  },
};

export default walletBalanceHelper;

const _getAvailablesAmount = (balances, bondDenom) => {
  const filteredBalances = balances.filter(
    (balance) => balance.denom === bondDenom
  );
  return filteredBalances.reduce(
    (acc, item) => acc + parseFloat(item.amount),
    0
  );
};

const _getDelegationsAmount = (delegations) => {
  return delegations.reduce(
    (acc, item) => acc + parseFloat(item.balance.amount),
    0
  );
};

const _getRewardsAmount = (rewards, bondDenom) => {
  const filteredRewards = rewards.filter(
    (reward) => reward.denom === bondDenom
  );
  return filteredRewards.reduce(
    (acc, item) => acc + parseFloat(item.amount),
    0
  );
};

const _getUnbondingsAmount = (unbondings) => {
  let amount = 0;
  for (const unbonding of unbondings) {
    amount += unbonding.entries.reduce(
      (acc, item) => acc + parseFloat(item.balance),
      0
    );
  }
  return amount;
};

class Capital {
  constructor() {
    this.availables = 0;
    this.commission = 0;
    this.delegations = 0;
    this.rewards = 0;
    this.unbondings = 0;
  }

  get earning() {
    return this.delegations;
  }

  get notEarning() {
    return this.availables + this.commission + this.rewards + this.unbondings;
  }

  get total() {
    return (
      this.availables +
      this.commission +
      this.delegations +
      this.rewards +
      this.unbondings
    );
  }

  get assets() {
    return {
      earning: this.earning,
      notEarning: this.notEarning,
      total: this.total,
    };
  }

  get capitalization() {
    return {
      availables: this.availables,
      commission: this.commission,
      delegations: this.delegations,
      unbondings: this.unbondings,
      rewards: this.rewards,
      total: this.total,
    };
  }
}
