import {
  arrayHandler,
  bech32Manager
} from "../index";

class ValidatorsTableAdapter {
  constructor() {
    this.clear();
  }

  clear() {
    this.validators = null;
    this.blocks = null;
    this.coin = null;
    this.pool = null;
    this.validatorsSet = null;
  }

  setValidators(validators) {
    this.validators = validators;
    return this;
  }

  setBlocks(blocks) {
    let orderedBlocks = [];
    if (blocks.length > 0) {
      orderedBlocks = blocks.sort((a, b) => b['header']['height'] - a['header']['height']);
    }
    this.blocks = orderedBlocks.length > 100 ?
      orderedBlocks.slice(orderedBlocks.length - 100, orderedBlocks.length) :
      orderedBlocks;
    return this;
  }

  setCoin(coin) {
    this.coin = coin;
    return this;
  }

  setPool(pool) {
    this.pool = pool;
    return this;
  }

  setValidatorsSet(validatorsSet) {
    this.validatorsSet = validatorsSet;
    return this;
  }

  get() {
    const bondedTokens = parseInt(this.pool.bonded_tokens);
    const tokensOrdered = arrayHandler.sortObjectsByNumberPropertyValueDesc(this.validators, "tokens");
    const statusOrdered = arrayHandler.sortObjectsByNumberPropertyValueDesc(tokensOrdered, "status");
    let cumulative = 0;
    let rank = 0;
    let validatorsTable = [];

    statusOrdered.forEach(validator => {
      rank++;
      const active = validator.status === 2 ? true : false;
      const moniker = validator.description.moniker;
      const operator = validator.operator_address;
      const tokens = parseInt(validator.tokens);
      const commission = parseFloat(validator.commission.commission_rates.rate);
      let votingPower = 0;
      let missingCounter = 0;
      if (active) {
        votingPower = tokens / bondedTokens;
        cumulative += votingPower;
        let pubKey = validator.consensus_pubkey;
        let validatorIndex = this.validatorsSet.findIndex(
          validator => validator.pub_key === pubKey
        );
        if (validatorIndex > -1) {
          let hex = bech32Manager.decode(this.validatorsSet[validatorIndex].address);
          this.blocks.forEach(block => {
            let signatures = block.last_commit.signatures;
            let signatureIndex = signatures.findIndex(function (signature) {
              return signature.validator_address.toUpperCase() === hex.toUpperCase();
            });
            if (signatureIndex === -1) {
              missingCounter++;
            }
          });
        }
      }

      const data = {
        rank: rank,
        active: active,
        moniker: moniker,
        operator: operator,
        tokens: new Intl.NumberFormat(undefined, {
          maximumFractionDigits: 0
        }).format(tokens / 1000000) + " " + this.coin,
        commission: toPercent(commission, 0, 0),
        votingPower: active ? toPercent(votingPower, 2, 2) : "-",
        cumulative: active ? toPercent(cumulative, 2, 2) : "-",
        attendance: active ? toPercent((100 - missingCounter) / 100, 2, 2) : "-",
      };
      validatorsTable.push(data);
    });

    this.clear();
    return validatorsTable;
  }
}

const toPercent = (x, maximumFractionDigits, minimumFractionDigits) => new Intl.NumberFormat(undefined, {
  style: 'percent',
  maximumFractionDigits,
  minimumFractionDigits
}).format(x);

export default new ValidatorsTableAdapter();