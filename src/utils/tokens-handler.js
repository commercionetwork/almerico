const tokensHandler = {
  convertFromBase(amount, decimals) {
    return parseInt(amount) / Math.pow(10, decimals);
  },
  convertToBase(amount, decimals) {
    return Math.round(parseFloat(amount) * Math.pow(10, decimals));
  },
  format(amount, decimals) {
    if (isNaN(parseFloat(amount)) || isNaN(parseFloat(decimals))) {
      return '';
    }
    return formatAmount(amount, decimals);
  },
};

export default tokensHandler;

const formatAmount = (amount, decimals = 0) =>
  new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(amount);
