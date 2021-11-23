const accountBalanceHelper = {
  build({ balances, commission, delegations, rewards, unbondings, bondDenom }) {
    const capital = new Capital();

    if (balances && balances.length > 0) {
      capital.availables = _getAvailablesAmount(balances, bondDenom);
    }
    if (
      commission &&
      commission.commission &&
      commission.commission.length > 0
    ) {
      capital.commission = _getCommissionAmount(
        commission.commission,
        bondDenom,
      );
    }
    if (delegations && delegations.length > 0) {
      capital.delegations = _getDelegationsAmount(delegations);
    }
    if (rewards && rewards.total && rewards.total.length > 0) {
      capital.rewards = _getRewardsAmount(rewards.total, bondDenom);
    }
    if (unbondings && unbondings.length > 0) {
      capital.unbondings = _getUnbondingsAmount(unbondings);
    }

    return capital;
  },
};

export default accountBalanceHelper;

const _getAvailablesAmount = (balances, bondDenom) => {
  const filteredBalances = balances.filter(
    (balance) => balance.denom === bondDenom,
  );
  return filteredBalances.reduce(
    (acc, item) => acc + parseFloat(item.amount),
    0,
  );
};

const _getCommissionAmount = (commission, bondDenom) => {
  const filteredCommission = commission.filter(
    (item) => item.denom === bondDenom,
  );
  return filteredCommission.reduce(
    (acc, item) => acc + parseFloat(item.amount),
    0,
  );
};

const _getDelegationsAmount = (delegations) => {
  return delegations.reduce(
    (acc, item) => acc + parseFloat(item.balance.amount),
    0,
  );
};

const _getRewardsAmount = (rewards, bondDenom) => {
  const filteredRewards = rewards.filter(
    (reward) => reward.denom === bondDenom,
  );
  return filteredRewards.reduce(
    (acc, item) => acc + parseFloat(item.amount),
    0,
  );
};

const _getUnbondingsAmount = (unbondings) => {
  let amount = 0;
  for (const unbonding of unbondings) {
    amount += unbonding.entries.reduce(
      (acc, item) => acc + parseFloat(item.balance),
      0,
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
