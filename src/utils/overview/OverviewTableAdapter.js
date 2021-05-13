const validatorSubtotal = 10000000;
const endCustomerSubtotal = 15000000;
const communitySubtotal = 10000000;
const vbrSubtotal = 12500000;
const abrSubtotal = 12500000;
const burned = 3500;

export default class OverviewTableAdapter {
  tableData = [];
  totalCirculating = 0;
  totalNonCirculating = 0;
  total =
    validatorSubtotal +
    endCustomerSubtotal +
    communitySubtotal +
    vbrSubtotal +
    abrSubtotal;

  constructor({ accountsTokens, abrTokens, vbrTokens, denom }) {
    this.accounts = accountsTokens;
    this.abr = abrTokens;
    this.vbr = vbrTokens;
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
    return this.tableData;
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
    this.totalNonCirculating += validatorSubtotal - notDistributed;
    this.addTableRow({
      type: 'Validator Tokens Distributed',
      circulating: 0,
      nonCirculating: toDecimal(validatorSubtotal - notDistributed),
      total: toDecimal(validatorSubtotal - notDistributed),
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
    const notDistributed = getTokensByDenom({
      balances: this.abr,
      denom: this.denom,
    });
    this.totalCirculating += abrSubtotal - notDistributed - 463619;
    this.totalNonCirculating += notDistributed + 463619;
    this.addTableRow({
      type: 'ABR Tokens Distributed',
      circulating: toDecimal(abrSubtotal - notDistributed - 463619),
      nonCirculating: toDecimal(463619),
      total: toDecimal(abrSubtotal - notDistributed),
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
