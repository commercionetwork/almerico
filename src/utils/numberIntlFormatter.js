const numberIntlFormatter = {
  /**
   *
   * @param {Number || String} amount
   * @param {Number} maximumFractionDigits
   * @param {Number} minimumFractionDigits
   * @returns {String}
   */
  toDecimal({ amount, maximumFractionDigits, minimumFractionDigits }) {
    return new Intl.NumberFormat(undefined, {
      style: 'decimal',
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: minimumFractionDigits,
    }).format(amount);
  },
  /**
   *
   * @param {Number || String} amount
   * @param {Number} maximumFractionDigits
   * @param {Number} minimumFractionDigits
   * @returns {String}
   */
  toPercent({ amount, maximumFractionDigits, minimumFractionDigits }) {
    return new Intl.NumberFormat(undefined, {
      style: 'percent',
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: minimumFractionDigits,
    }).format(amount);
  },
};

export default numberIntlFormatter;
