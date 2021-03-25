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
    const delegatorTokens = parseFloat(this.validator.tokens);

    let aggregated = [];
    for (const delegation of delegations) {
      const delegator = delegation.delegator_address;
      if (delegator === this.address) {
        continue;
      }
      const amount = parseFloat(delegation.balance.amount);
      const index =
        aggregated.length > 0
          ? aggregated.findIndex(item => item.delegator === delegator)
          : -1;
      if (index === -1) {
        aggregated.push({
          delegator: delegator,
          amount: amount,
          share: amount / delegatorTokens
        });
      } else {
        const newAmount = aggregated[index]["amount"] + amount;
        aggregated[index]["amount"] = newAmount;
        aggregated[index]["share"] = newAmount / delegatorTokens;
      }
    }

    this.clear;
    return aggregated;
  }
}

export default new ValidatorDelegatorsAggregator();
