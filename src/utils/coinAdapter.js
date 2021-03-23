import numberIntlFormatter from "./numberIntlFormatter";

const coinAdapter = {
  /**
   *
   * @param {Object} balance
   * @return {String}
   */
  format(balance) {
    if (!balance.denom || !balance.amount) {
      return;
    }
    const amount = isNaN(balance.amount)
      ? parseInt(balance.amount)
      : balance.amount;
    const denom = balance.denom;

    let formattedCoin = "";
    if (denom.substring(0, 1) === "u") {
      const localeAmount = numberIntlFormatter.toDecimal({
        amount: amount / 1000000,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      });
      const shortDenom = denom.substring(1, 4);
      formattedCoin = `${localeAmount} ${shortDenom}`;
    } else {
      const localeAmount = numberIntlFormatter.toDecimal({
        amount: amount,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
      });
      formattedCoin = `${localeAmount} ${denom}`;
    }
    return formattedCoin;
  }
};

export default coinAdapter;
