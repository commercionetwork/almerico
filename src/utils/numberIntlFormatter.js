const numberIntlFormatter = {
  toDecimal({ amount, maximumFractionDigits, minimumFractionDigits }) {
    return new Intl.NumberFormat(undefined, {
      style: 'decimal',
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: minimumFractionDigits,
    }).format(amount);
  },
  toPercent({ amount, maximumFractionDigits, minimumFractionDigits }) {
    return new Intl.NumberFormat(undefined, {
      style: 'percent',
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: minimumFractionDigits,
    }).format(amount);
  },
};

export default numberIntlFormatter;
