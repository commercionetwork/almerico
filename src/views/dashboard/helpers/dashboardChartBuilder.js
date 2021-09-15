const UNIT_CONVERTER = 1000000;
const MAX_SUPPLY = 60 * UNIT_CONVERTER;

const dashboardChartBuilder = {
  build({ abrTokens, params, pool, tokens, vbrTokens }) {
    const data = getDecimal({ abrTokens, params, pool, tokens, vbrTokens });
    return new Promise((resolve) => {
      resolve({
        all: {
          label: toDecimal(MAX_SUPPLY),
        },
        bonded: {
          decimal: data.bonded,
          percent: getPercent(data.bonded),
        },
        burned: {
          decimal: data.burned,
          percent: getPercent(data.burned),
        },
        unbonded: {
          decimal: data.unbonded,
          percent: getPercent(data.unbonded),
        },
        unreleasedRewards: {
          decimal: data.unreleasedRewards,
          percent: getPercent(data.unreleasedRewards),
        },
      });
    });
  },
};

export default dashboardChartBuilder;

export const getDecimal = ({ abrTokens, params, pool, tokens, vbrTokens }) => {
  const denom = params.bond_denom;
  const all = getTokensByDenom({ tokens: tokens, denom: denom });
  const burned = MAX_SUPPLY - all;
  const bonded = parseFloat(pool.bonded_tokens) / UNIT_CONVERTER;
  const abrs = getTokensByDenom({ tokens: abrTokens, denom: denom });
  const vbrs = getTokensByDenom({ tokens: vbrTokens, denom: denom });
  const unreleasedRewards = abrs + vbrs;
  const unbonded = all - bonded - burned - unreleasedRewards;
  return { all, bonded, burned, unbonded, unreleasedRewards };
};

/**
 * @typedef {Object} ParamGetTokensByDenom
 * @property {Array.<Object>} Balances
 * @property {String} denom
 *
 * @param {ParamGetTokensByDenom} p
 * @returns {Number}
 */
export const getTokensByDenom = ({ tokens, denom }) => {
  if (tokens.length < 1) return 0;
  const token = tokens.find((token) => token.denom === denom);
  return parseFloat(token.amount) / UNIT_CONVERTER;
};

/**
 * @param {Number} amount
 * @param {Number} maximumFractionDigits
 * @param {Number} minimumFractionDigits
 * @returns {String}
 */
export const toDecimal = (
  amount,
  maximumFractionDigits = 0,
  minimumFractionDigits = 0,
) => {
  return new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(amount);
};

export const getPercent = (value) => {
  const amount = value / MAX_SUPPLY;
  return toPercent(amount);
};

/**
 * @param {Number} amount
 * @param {Number} maximumFractionDigits
 * @param {Number} minimumFractionDigits
 * @returns {String}
 */
export const toPercent = (
  amount,
  maximumFractionDigits = 2,
  minimumFractionDigits = 2,
) => {
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(amount);
};
