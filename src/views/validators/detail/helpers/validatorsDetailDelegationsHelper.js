const validatorsDetailDelegationsHelper = {
  build(delegations, address) {
    const distribution = new Distribution();

    for (const delegation of delegations) {
      const amount = parseFloat(delegation.balance.amount);
      if (delegation.delegation.delegator_address === address) {
        distribution.increaseSelf(amount);
      } else {
        distribution.increaseOthers(amount);
      }
    }

    return distribution;
  },
};

export default validatorsDetailDelegationsHelper;

class Distribution {
  constructor() {
    this.self = 0;
    this.others = 0;
  }

  increaseSelf(amount) {
    this.self += amount;
  }

  increaseOthers(amount) {
    this.others += amount;
  }

  get total() {
    return this.self + this.others;
  }
}
