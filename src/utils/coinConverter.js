/**
 * Function to format coin's amount
 * 
 * @param {CoinAmount} coin 
 */

const coinConverter = coin => {
  return coin.denom.charAt(0) === "u" ? {
    denom: coin.denom.substring(1),
    amount: parseFloat(coin.amount) * 0.000001
  } : {
    denom: coin.denom,
    amount: parseFloat(coin.amount)
  };
};

export default coinConverter;
