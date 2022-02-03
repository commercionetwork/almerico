const validatorsDetailDelegatorsHelper = {
  build({ account, detail, delegations }) {
    const aggregated = [];
    const tokens = parseFloat(detail.tokens);

    for (const el of delegations) {
      const delegator = el.delegation.delegator_address;
      if (delegator === account) {
        continue;
      }
      const amount = parseFloat(el.balance.amount);
      const index =
        aggregated.length > 0
          ? aggregated.findIndex((item) => item.delegator === delegator)
          : -1;
      if (index === -1) {
        aggregated.push({
          delegator: delegator,
          amount: amount,
          share: amount / tokens,
        });
      } else {
        const newAmount = aggregated[index]['amount'] + amount;
        aggregated[index]['amount'] = newAmount;
        aggregated[index]['share'] = newAmount / tokens;
      }
    }

    return aggregated;
  },
};

export default validatorsDetailDelegatorsHelper;
