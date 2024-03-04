import { CONFIG } from '@/constants';
import { dateHandler } from '@/utils';

const walletSummaryHelper = {
  getHeaders: () => {
    return [
      { text: 'Validator', value: 'moniker' },
      { text: 'Amount', value: 'amount', sortable: false },
      { text: 'Completion time', value: 'completion_time', sortable: false },
    ];
  },
  getItems: ({ delegations, unbondings, validators }) => {
    const items = [];
    for (const delegation of delegations) {
      const validatorAddress = delegation.delegation.validator_address;
      const validator = validators.find(
        (validator) => validator.operator_address === validatorAddress
      );
      if (!validator) {
        return null;
      }
      items.push({
        moniker: validator.moniker,
        amount: buildAmount(delegation.balance.amount),
      });
      unbondings
        .filter((unbonding) => unbonding.validator_address === validatorAddress)
        .forEach((unbonding) => {
          unbonding.entries.forEach((entry) => {
            if (new Date(entry.completion_time) < new Date()) {
              return;
            }
            const countdown = getCoutdown(entry.completion_time);
            items.push({
              moniker: validator.moniker,
              amount: buildAmount(entry.balance),
              completion_time: entry.completion_time,
              countdown,
            });
          });
        });
    }
    return items;
  },
};

export default walletSummaryHelper;

const buildAmount = (amount) => {
  const amountFromBase = parseInt(amount) / Math.pow(10, CONFIG.TOKEN.EXPONENT);
  return `${amountFromBase.toFixed(2)} ${CONFIG.TOKEN.SYMBOL}`;
};

const getCoutdown = (completionTime) => {
  return dateHandler.getFormattedDifference(
    new Date(),
    new Date(completionTime)
  );
};
