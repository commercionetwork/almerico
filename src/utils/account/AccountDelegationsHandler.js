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

    this.delegations.forEach(delegation => {
      let moniker = this.validators.find(
        (validator) => validator["operator_address"] === delegation["validator_address"]
      )["description"]["moniker"];
      items.push({
        moniker: moniker,
        operator: delegation["validator_address"],
        amount: parseFloat(delegation["shares"]),
      });
    });

    this.clear;
    return items;
  }
}

export default new AccountDelegationsHandler();