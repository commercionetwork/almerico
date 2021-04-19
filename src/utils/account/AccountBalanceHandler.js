export default class AccountBalanceHandler {
  constructor({ delegations, rewards, unbondings, balances, bondDenom }) {
    this.delegations = delegations;
    this.rewards = rewards;
    this.unbondings = unbondings;
    this.balances = balances;
    this.bondDenom = bondDenom;
  }

  build() {
    const capital = { delegations: 0, rewards: 0, unbondings: 0, availables: 0 };

    if (this.delegations && this.delegations.length > 0) {
      capital.delegations = getDelegationsAmount(this.delegations);
    }
    if (this.rewards && this.rewards.total && this.rewards.total.length > 0) {
      capital.rewards = getRewardsAmount(this.rewards.total);
    }
    if (this.unbondings && this.unbondings.length > 0) {
      capital.unbondings = getUnbondingsAmount(this.unbondings);
    }
    if (this.balances && this.balances.length > 0) {
      capital.availables = getAvailablesAmount(this.balances, this.bondDenom);
    }
    capital.earning = capital.delegations;
    capital.notEarning = capital.rewards + capital.unbondings + capital.availables;
    capital.total =
      capital.delegations + capital.rewards + capital.unbondings + capital.availables;

    return capital;
  }

  static filterAssets(capital) {
    return {
      earning: capital.earning,
      notEarning: capital.notEarning,
      total: capital.total,
    };
  }

  static filterCapitalization(capital) {
    return {
      delegations: capital.delegations,
      unbondings: capital.unbondings,
      rewards: capital.rewards,
      availables: capital.availables,
      total: capital.total,
    };
  }
}

function getDelegationsAmount(delegations) {
  return delegations.reduce(
    (acc, item) => acc + parseFloat(item.balance.amount),
    0,
  );
}

function getRewardsAmount(total) {
  return total.reduce((acc, item) => acc + parseFloat(item.amount), 0);
}

function getUnbondingsAmount(unbondings) {
  let amount = 0;
  for (const unbonding of unbondings) {
    amount += unbonding.entries.reduce(
      (acc, item) => acc + parseFloat(item.balance),
      0,
    );
  }
  return amount;
}

function getAvailablesAmount(balances, bondDenom) {
  const filteredBalances = balances.filter(
    (balance) => balance.denom === bondDenom,
  );
  return filteredBalances.reduce(
    (acc, item) => acc + parseFloat(item.amount),
    0,
  );
}
