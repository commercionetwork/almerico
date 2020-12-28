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

    this.delegations.reduce(
      (acc, delegation) => {
        let amount = parseFloat(delegation.balance.amount);
        delegation.delegator_address === this.address ?
          acc['self'] += amount :
          acc['others'] += amount;
        acc['total'] += amount;
        return acc;
      }, tokens
    );

    this.clear;
    return tokens;
  }
}

export default new ValidatorDelegationsHandler();