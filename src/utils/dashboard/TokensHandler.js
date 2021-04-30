import numberIntlFormatter from '../numberIntlFormatter';

export default class TokensHandler {
  bonded = 0;
  unbonded = 0;
  total = 0;

  constructor({ params, tokens, pool }) {
    this.params = params;
    this.pool = pool;
    this.tokens = tokens;
  }

  build() {
    const denom = this.params.bond_denom;
    const all = getAll(this.tokens, denom);
    this.total = parseFloat(all.amount);
    this.bonded = parseFloat(this.pool.bonded_tokens);
    this.unbonded = this.total - this.bonded;
    return {
      amount: {
        bonded: this.bonded,
        unbonded: this.unbonded,
        total: this.total,
      },
      million: {
        bonded: getMillion(this.bonded, denom),
        unbonded: getMillion(this.unbonded, denom),
        total: getMillion(this.total, denom),
      },
      percent: {
        bonded: getPercent(this.bonded, this.total),
        unbonded: getPercent(this.unbonded, this.total),
      },
    };
  }
}

function getAll(tokens, denom) {
  return tokens.find((token) => token.denom === denom);
}

function getMillion(tokens, denom) {
  const amount = tokens / 1000000;
  const shortDenom = denom.substring(1, 4).toUpperCase();
  return `${numberIntlFormatter.toDecimal({
    amount,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })} ${shortDenom}`;
}

function getPercent(tokens, total) {
  const amount = tokens / total;
  return numberIntlFormatter.toPercent({
    amount,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}
