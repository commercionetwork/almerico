class ValidatorDelegatorsAggregator {
  constructor() {
    this.clear();
  }

  clear() {
    this.address = null;
    this.validator = null;
  }

  setAccount(address) {
    this.address = address;
    return this;
  }

  setValidator(validator) {
    this.validator = validator;
    return this;
  }

  get() {
    const delegations = this.validator.delegations;
    const delegatorShares = parseFloat(this.validator.delegator_shares);

    let aggregated = [];
    for (const delegation of delegations) {
      const delegator = delegation.delegator_address;
      if (delegator === this.address) {
        continue;
      }
      const shares = parseFloat(delegation['shares']);
      const index =
        aggregated.length > 0
          ? aggregated.findIndex((item) => item.delegator === delegator)
          : -1;
      if (index === -1) {
        aggregated.push({
          delegator: delegator,
          amount: shares,
          share: shares / delegatorShares,
        });
      } else {
        const newAmount = aggregated[index]['amount'] + shares;
        aggregated[index]['amount'] = newAmount;
        aggregated[index]['share'] = newAmount / delegatorShares;
      }
    }

    this.clear;
    return aggregated;
  }
}

export default new ValidatorDelegatorsAggregator();
