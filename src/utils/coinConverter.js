/**
 * Function to format coin's amount
 * 
 * @param {Amount} amount 
 */

const coinConverter = amount => {
  return amount.denom.charAt(0) === "u" ? {
    denom: amount.denom.substring(1),
    amount: parseFloat(amount.amount) * 0.000001
  } : {
    denom: amount.denom,
    amount: parseFloat(amount.amount)
  };
};

export default coinConverter;
