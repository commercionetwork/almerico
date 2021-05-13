const validatorSubtotal = 10000000;
const endCustomerSubtotal = 15000000;
const communitySubtotal = 10000000;
const vbrSubtotal = 12500000;
const abrSubtotal = 12500000;

export default class OverviewTableAdapter {
  tableData = [];
  validatorTokensDistributed = 0;
  totalCirculating = 0;
  totalNonCirculating = 0;
  total =
    validatorSubtotal +
    endCustomerSubtotal +
    communitySubtotal +
    vbrSubtotal +
    abrSubtotal;

  constructor({
    accountsTokens,
    abrTokens,
    allTokens,
    vbrTokens,
    bondedTokens,
    denom,
  }) {
    this.accounts = accountsTokens;
    this.abr = abrTokens;
    this.all = allTokens;
    this.vbr = vbrTokens;
    this.bonded = bondedTokens;
    this.denom = denom;
  }

  build() {
    this.setValidatorData();
    this.setEndCustomerData();
    this.setCommunityData();
    this.setVbrData();
    this.setAbrData();
    this.setBurnedData();
    this.setTotalData();
    const rate = this.getExchangeRate();
    return { tableData: this.tableData, exchangeRate: rate };
  }

  addTableRow({ type, circulating, nonCirculating, total }) {
    this.tableData.push({ type, circulating, nonCirculating, total });
  }

  setValidatorData() {
    const notDistributed = getTokensByAccount({
      accounts: this.accounts,
      name: 'validator',
      denom: this.denom,
    });
    this.totalCirculating += notDistributed;
    this.validatorTokensDistributed = validatorSubtotal - notDistributed;
    this.totalNonCirculating += this.validatorTokensDistributed;
    this.addTableRow({
      type: 'Validator Tokens Distributed',
      circulating: 0,
      nonCirculating: toDecimal(this.validatorTokensDistributed),
      total: toDecimal(this.validatorTokensDistributed),
    });
    this.addTableRow({
      type: 'Validator Tokens Not Distributed',
      circulating: toDecimal(notDistributed),
      nonCirculating: 0,
      total: toDecimal(notDistributed),
    });
    this.addTableRow({
      type: 'Subtotal',
      circulating: null,
      nonCirculating: null,
      total: toDecimal(validatorSubtotal),
    });
  }

  setEndCustomerData() {
    const notDistributed = getTokensByAccount({
      accounts: this.accounts,
      name: 'endCustomer',
      denom: this.denom,
    });
    this.totalCirculating += notDistributed;
    this.totalNonCirculating += endCustomerSubtotal - notDistributed;
    this.addTableRow({
      type: 'End customer Tokens Distributed',
      circulating: 0,
      nonCirculating: toDecimal(endCustomerSubtotal - notDistributed),
      total: toDecimal(endCustomerSubtotal - notDistributed),
    });
    this.addTableRow({
      type: 'End customer Tokens Not Distributed',
      circulating: toDecimal(notDistributed),
      nonCirculating: 0,
      total: toDecimal(notDistributed),
    });
    this.addTableRow({
      type: 'Subtotal',
      circulating: null,
      nonCirculating: null,
      total: toDecimal(endCustomerSubtotal),
    });
  }

  setCommunityData() {
    const notDistributed = getTokensByAccount({
      accounts: this.accounts,
      name: 'community',
      denom: this.denom,
    });
    this.totalCirculating += communitySubtotal;
    this.addTableRow({
      type: 'Community Tokens Distributed',
      circulating: toDecimal(communitySubtotal - notDistributed),
      nonCirculating: 0,
      total: toDecimal(communitySubtotal - notDistributed),
    });
    this.addTableRow({
      type: 'Community Tokens Not Distributed',
      circulating: toDecimal(notDistributed),
      nonCirculating: 0,
      total: toDecimal(notDistributed),
    });
    this.addTableRow({
      type: 'Subtotal',
      circulating: null,
      nonCirculating: null,
      total: toDecimal(communitySubtotal),
    });
  }

  setVbrData() {
    const notDistributed = getTokensByDenom({
      balances: this.vbr,
      denom: this.denom,
    });
    this.totalNonCirculating += vbrSubtotal;
    this.addTableRow({
      type: 'VBR Tokens Distributed',
      circulating: 0,
      nonCirculating: toDecimal(vbrSubtotal - notDistributed),
      total: toDecimal(vbrSubtotal - notDistributed),
    });
    this.addTableRow({
      type: 'VBR Tokens Not Distributed',
      circulating: 0,
      nonCirculating: toDecimal(notDistributed),
      total: toDecimal(notDistributed),
    });
    this.addTableRow({
      type: 'Subtotal',
      circulating: null,
      nonCirculating: null,
      total: toDecimal(vbrSubtotal),
    });
  }

  setAbrData() {
    const bondedTokens = parseFloat(this.bonded / 1000000);
    const notDistributed = getTokensByDenom({
      balances: this.abr,
      denom: this.denom,
    });
    const distributed = abrSubtotal - notDistributed;
    const nonCirculatingDistributed =
      bondedTokens - this.validatorTokensDistributed;
    const circulatingDistributed = distributed - nonCirculatingDistributed;
    this.totalCirculating += circulatingDistributed;
    this.totalNonCirculating += notDistributed + nonCirculatingDistributed;
    this.addTableRow({
      type: 'ABR Tokens Distributed',
      circulating: toDecimal(circulatingDistributed),
      nonCirculating: toDecimal(nonCirculatingDistributed),
      total: toDecimal(distributed),
    });
    this.addTableRow({
      type: 'ABR Tokens Not Distributed',
      circulating: 0,
      nonCirculating: toDecimal(notDistributed),
      total: toDecimal(notDistributed),
    });
    this.addTableRow({
      type: 'Subtotal',
      circulating: null,
      nonCirculating: null,
      total: toDecimal(abrSubtotal),
    });
  }

  setBurnedData() {
    const burned =
      this.total - getTokensByDenom({ balances: this.all, denom: this.denom });
    this.addTableRow({
      type: 'Burned',
      circulating: null,
      nonCirculating: toDecimal(burned),
      total: null,
    });
  }

  setTotalData() {
    this.addTableRow({
      type: 'TOTAL',
      circulating: toDecimal(this.totalCirculating),
      nonCirculating: toDecimal(this.totalNonCirculating),
      total: toDecimal(this.total),
    });
    this.addTableRow({
      type: 'Percentage',
      circulating: toPercent(this.totalCirculating / this.total),
      nonCirculating: toPercent(this.totalNonCirculating / this.total),
      total: toPercent(1),
    });
  }

  getExchangeRate() {
    return 1 / (this.totalCirculating / this.total);
  }
}

const getTokensByAccount = ({ accounts, name, denom }) => {
  const account = accounts.find((account) => account.name === name);
  return getTokensByDenom({ balances: account.balances, denom: denom });
};

const getTokensByDenom = ({ balances, denom }) => {
  const balance = balances.find((balance) => balance.denom === denom);
  return parseFloat(balance.amount) / 1000000;
};

const toDecimal = (amount) => {
  return new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
};

const toPercent = (amount) => {
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
};
