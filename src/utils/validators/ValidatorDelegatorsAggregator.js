class ValidatorDelegatorsAggregator {
  constructor() {
    this.clear();
  }

  clear() {
    this.address = null;
    this.validator = null;
  }

  setAccount(address){
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
    let aggregated = delegations.reduce((acc, delegation) => {
      let delegator = delegation.delegator_address;
      if (delegator != this.address) {
        let shares = parseFloat(delegation['shares']);
        let index = acc.findIndex(item => item.delegator === delegator);
        if (index === -1) {
          acc.push({
            delegator: delegator,
            amount: shares,
            share: shares / delegatorShares,
          })
        } else {
          let newAmount = acc[index]['amount'] + shares;
          acc[index]['amount'] = newAmount;
          acc[index]['share'] = newAmount / delegatorShares;
        }
      }
      return acc;
    }, []);

    this.clear;
    return aggregated;
  }
}

export default new ValidatorDelegatorsAggregator();