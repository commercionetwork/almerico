const accountUnbondingsHelper = {
  build({ unbondings, validators }) {
    let items = [];

    unbondings.forEach((unbonding) => {
      unbonding.entries.forEach((entry) => {
        items.push({
          date: entry.completion_time,
          moniker: _getMoniker(validators, unbonding),
          operator: unbonding.validator_address,
          height: entry.creation_height,
          balance: entry.balance,
        });
      });
    });
    return items;
  },
};

export default accountUnbondingsHelper;

const _getMoniker = (validators, unbonding) => {
  const validator = validators.find(
    (validator) => validator.operator_address === unbonding.validator_address,
  );
  return validator.description.moniker;
};
