export default {
  /**
   * @param {Number} totalCirculatingSupply
   * @param {Number} maxSupply
   * @returns {String}
   */
  getRate(maxSupply, circulatingSupply) {
    if (circulatingSupply === 0 || maxSupply === 0) return 0;

    const rate = 1 / (circulatingSupply / maxSupply);
    return new Intl.NumberFormat(undefined, {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(rate);
  },
};
