import { numberIntlFormatter } from '@/utils';

const UNIT_CONVERTER = 1000000;
const MAX_SUPPLY = 60 * UNIT_CONVERTER;
const BACKGROUND_COLOR = [
  'rgb(47, 157, 119)',
  'rgb(238, 51, 0)',
  'rgb(255, 102, 0)',
  'rgb(0, 0, 0)',
];
const BORDER_COLOR = [
  'rgb(235, 249, 244)',
  'rgb(255, 235, 230)',
  'rgb(255, 240, 230)',
  'rgb(242, 242, 242)',
];
const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.label;
        },
      },
    },
  },
};

const tokensChartHelper = {
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
  getChartData({ abrTokens, params, pool, tokens, vbrTokens }) {
    const data = this.build({
      abrTokens,
      params,
      pool,
      tokens,
      vbrTokens,
    });
    return {
      labels: [
        `Bonded ${data.bonded.percent}`,
        `Not Bonded ${data.unbonded.percent}`,
        `Unrelease rewards ${data.unreleasedRewards.percent}`,
        `Burned ${data.burned.percent}`,
      ],
      datasets: [
        {
          data: [
            data.bonded.decimal,
            data.unbonded.decimal,
            data.unreleasedRewards.decimal,
            data.burned.decimal,
          ],
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  },
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
    const data = _getDecimal({
      abrTokens,
      params,
      pool,
      tokens,
      vbrTokens,
    });
    return {
      bonded: new ChartItem(data.bonded).item,
      burned: new ChartItem(data.burned).item,
      unreleasedRewards: new ChartItem(data.unreleasedRewards).item,
      unbonded: new ChartItem(data.unbonded).item,
    };
  },
  getChartLabel() {
    const amount = numberIntlFormatter.toDecimal({
      amount: MAX_SUPPLY,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    return `Total ${amount} COM`;
  },
  getChartOptions() {
    return CHART_OPTIONS;
  },
};

export default tokensChartHelper;

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
const _getDecimal = ({ abrTokens, params, pool, tokens, vbrTokens }) => {
  const denom = params.bond_denom;
  const all = _getTokensByDenom({ tokens: tokens, denom: denom });
  const burned = MAX_SUPPLY - all;
  const bonded = parseFloat(pool.bonded_tokens) / UNIT_CONVERTER;
  const abrs = _getTokensByDenom({ tokens: abrTokens, denom: denom });
  const vbrs = _getTokensByDenom({ tokens: vbrTokens, denom: denom });
  const unreleasedRewards = abrs + vbrs;
  const unbonded = MAX_SUPPLY - bonded - burned - unreleasedRewards;
  return { bonded, burned, unbonded, unreleasedRewards };
};

/**
 * @typedef {Object} ParamGetTokensByDenom
 * @property {Array.<Object>} Balances
 * @property {String} denom
 *
 * @param {ParamGetTokensByDenom} p
 * @returns {Number}
 */
const _getTokensByDenom = ({ tokens, denom }) => {
  if (tokens.length < 1) return 0;
  const token = tokens.find((token) => token.denom === denom);
  return parseFloat(token.amount) / UNIT_CONVERTER;
};

class ChartItem {
  /**
   *
   * @param {Number} amount
   */
  constructor(amount) {
    this.amount = amount;
  }

  get item() {
    return { decimal: this.amount, percent: this.getPercent() };
  }

  getPercent() {
    const amount = this.amount / MAX_SUPPLY;
    return numberIntlFormatter.toPercent({
      amount,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }
}
