/**
 * Function to format coin's amount
 *
 * @param {String} coin
 * @param {Number} exponent
 * @param {String} amount
 */

const coinsManager = (coin, exponent, amount) => {
  return coin.charAt(0) === "u" ? {
    amount: parseFloat(amount) / Math.pow(10, exponent),
    denom: coin.substring(1)
  } : {
    amount: parseFloat(amount),
    denom: coin
  };
};

export default coinsManager;
