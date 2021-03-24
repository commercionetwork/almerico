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
      unbonding.entries.forEach(entry => {
        items.push({
          date: entry.completion_time,
          moniker: getMoniker(this.validators, unbonding),
          height: entry.creation_height,
          amount: entry.balance
        });
      });
    });
    this.clear;
    return items;
  }
}

const getMoniker = (validators, source) => {
  const validator = validators.find(
    validator => validator.operator_address === source.validator_address
  );
  return validator.description.moniker;
};

export default new AccountUnbondingsHandler();
