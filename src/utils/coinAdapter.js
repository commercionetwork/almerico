import { orderBy } from 'lodash';

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
      convertedBalance.amount = new Intl.NumberFormat(undefined, {
        style: 'decimal',
        maximumFractionDigits: 6,
        minimumFractionDigits: 6,
      }).format(amount / 1000000);
      convertedBalance.denom = denom.substring(1, 4);
    } else {
      convertedBalance.amount = new Intl.NumberFormat(undefined, {
        style: 'decimal',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(amount);
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
    const orderedBalances = orderBy(balances, ['amount'], ['desc']);
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
