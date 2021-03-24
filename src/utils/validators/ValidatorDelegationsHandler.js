class ValidatorDelegationsHandler {
  constructor() {
    this.clear();
  }

  clear() {
    this.address = null;
    this.delegations = null;
  }

  setAddress(address) {
    this.address = address;
    return this;
  }

  setDelegations(delegations) {
    this.delegations = delegations;
    return this;
  }

  get() {
    let tokens = {
      others: 0,
      self: 0,
      total: 0,
    };

    for (const delegation of this.delegations) {
      const amount = parseFloat(delegation.balance.amount);
      tokens.total += amount;
      if (delegation.delegator_address === this.address) {
        tokens.self += amount;
      } else {
        tokens.others += amount;
      }
    }

    this.clear;
    return tokens;
  }
}

export default new ValidatorDelegationsHandler();