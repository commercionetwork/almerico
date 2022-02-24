const accountDelegationsHelper = {
  build({ delegations, validators }) {
    return delegations.map((delegation) => ({
      moniker: _getMoniker(validators, delegation.delegation),
      operator: delegation.delegation.validator_address,
      amount: parseFloat(delegation.balance.amount),
    }));
  },
};

export default accountDelegationsHelper;

const _getMoniker = (validators, delegation) => {
  const validator = validators.find(
    (validator) => validator.operator_address === delegation.validator_address,
  );
  return validator ? validator.description.moniker : '-';
};
