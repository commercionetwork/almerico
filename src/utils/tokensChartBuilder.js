import { numberIntlFormatter } from '@/utils';

const UNIT_CONVERTER = 1000000;
const MAX_SUPPLY = 60 * UNIT_CONVERTER;

const tokensChartBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} abrTokens
   * @property {Object} params
   * @property {Object} pool
   * @property {Array.<Object>} tokens
   * @property {Array.<Object>} vbrTokens
   *
   * @param {ParamBuild} p
   * @returns {Object}
   */
  build({ abrTokens, params, pool, tokens, vbrTokens }) {
    const data = this.getDecimal({
      abrTokens,
      params,
      pool,
      tokens,
      vbrTokens,
    });
    return {
      all: {
        label: numberIntlFormatter.toDecimal({
          amount: MAX_SUPPLY,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
      },
      bonded: {
        decimal: data.bonded,
        percent: this.getPercent(data.bonded),
      },
      burned: {
        decimal: data.burned,
        percent: this.getPercent(data.burned),
      },
      unbonded: {
        decimal: data.unbonded,
        percent: this.getPercent(data.unbonded),
      },
      unreleasedRewards: {
        decimal: data.unreleasedRewards,
        percent: this.getPercent(data.unreleasedRewards),
      },
    };
  },
  /**
   * @typedef {Object} ParamGetDecimal
   * @property {Array.<Object>} abrTokens
   * @property {Object} params
   * @property {Object} pool
   * @property {Array.<Object>} tokens
   * @property {Array.<Object>} vbrTokens
   *
   * @param {ParamGetDecimal} p
   * @returns {Object}
   */
  getDecimal({ abrTokens, params, pool, tokens, vbrTokens }) {
    const denom = params.bond_denom;
    const all = this.getTokensByDenom({ tokens: tokens, denom: denom });
    const burned = MAX_SUPPLY - all;
    const bonded = parseFloat(pool.bonded_tokens) / UNIT_CONVERTER;
    const abrs = this.getTokensByDenom({ tokens: abrTokens, denom: denom });
    const vbrs = this.getTokensByDenom({ tokens: vbrTokens, denom: denom });
    const unreleasedRewards = abrs + vbrs;
    const unbonded = all - bonded - burned - unreleasedRewards;
    return { bonded, burned, unbonded, unreleasedRewards };
  },

  /**
   * @typedef {Object} ParamGetTokensByDenom
   * @property {Array.<Object>} Balances
   * @property {String} denom
   *
   * @param {ParamGetTokensByDenom} p
   * @returns {Number}
   */
  getTokensByDenom({ tokens, denom }) {
    if (tokens.length < 1) return 0;
    const token = tokens.find((token) => token.denom === denom);
    return parseFloat(token.amount) / UNIT_CONVERTER;
  },

  getPercent(value) {
    const amount = value / MAX_SUPPLY;
    return numberIntlFormatter.toPercent({
      amount,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  },
};

export default tokensChartBuilder;
