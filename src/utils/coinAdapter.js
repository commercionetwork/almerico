import { arrayHandler, numberIntlFormatter } from './index';

const coinAdapter = {
  /**
   *
   * @param {Object} balance
   * @return {Object}
   */
  convertItem(balance) {
    const convertedBalance = {};
    const amount = isNaN(balance.amount)
      ? parseInt(balance.amount)
      : balance.amount;
    const denom = balance.denom;
    if (denom.substring(0, 1) === 'u') {
      convertedBalance.amount = numberIntlFormatter.toDecimal({
        amount: amount / 1000000,
        maximumFractionDigits: 6,
        minimumFractionDigits: 6,
      });
      convertedBalance.denom = denom.substring(1, 4);
    } else {
      convertedBalance.amount = numberIntlFormatter.toDecimal({
        amount: amount,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      convertedBalance.denom = denom;
    }

    return convertedBalance;
  },
  /**
   *
   * @param {Array.<Object>} balance
   * @return {Array.<Object>}
   */
  convertList(balances) {
    const convertedBalances = [];
    const orderedBalances = arrayHandler.sortObjectsByNumberPropertyValueDesc(
      balances,
      'amount',
    );
    for (const balance of orderedBalances) {
      if (!isBalance(balance)) {
        continue;
      }
      const convertedBalance = this.convertItem(balance);
      convertedBalances.push(convertedBalance);
    }
    return convertedBalances;
  },
  /**
   *
   * @param {Object} balance
   * @return {String}
   */
  format(balance) {
    if (!isBalance(balance)) {
      return;
    }
    const convertedBalance = this.convertItem(balance);
    return `${convertedBalance.amount} ${convertedBalance.denom}`;
  },
};

export default coinAdapter;

const isBalance = (balance) => balance.denom && balance.amount;
