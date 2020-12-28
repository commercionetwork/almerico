class AccountUnbondingsHandler {
  constructor() {
    this.clear();
  }

  clear() {
    this.unbondings = null;
    this.validators = null;
  }

  setUnbondings(unbondings) {
    this.unbondings = unbondings;
    return this;
  }

  setValidators(validators) {
    this.validators = validators;
    return this;
  }

  get() {
    let items = [];

    this.unbondings.forEach(unbonding => {
      let moniker = this.validators.find(
        (validator) => validator["operator_address"] === unbonding["validator_address"]
      )["description"]["moniker"];
      unbonding.entries.forEach(entry => {
        items.push({
          date: entry.completion_time,
          moniker: moniker,
          height: entry.creation_height,
          amount: entry.balance,
        });
      });

    });
    this.clear;
    return items;
  }
}

export default new AccountUnbondingsHandler();