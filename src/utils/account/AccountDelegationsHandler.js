class AccountDelegationsHandler {
  constructor() {
    this.clear();
  }

  clear() {
    this.delegations = null;
    this.validators = null;
  }

  setDelegations(delegations) {
    this.delegations = delegations;
    return this;
  }

  setValidators(validators) {
    this.validators = validators;
    return this;
  }

  get() {
    let items = [];

    this.delegations.forEach((delegation) => {
      items.push({
        moniker: getMoniker(this.validators, delegation),
        operator: delegation.validator_address,
        amount: parseFloat(delegation.balance.amount),
      });
    });

    this.clear;
    return items;
  }
}

const getMoniker = (validators, source) => {
  const validator = validators.find(
    (validator) => validator.operator_address === source.validator_address,
  );
  return validator.description.moniker;
};

export default new AccountDelegationsHandler();
