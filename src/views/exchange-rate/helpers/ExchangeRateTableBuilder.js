const validatorSubtotal = 10000000;
const liquidityPoolSubtotal = 15000000;
const communitySubtotal = 10000000;
const fundsSubtotal = 25000000;

const tableData = [];
/**
 * @param {String} type
 * @param {String} quantity
 * @param {String} percentage
 */
const addTableRow = ({ label, quantity, percentage }) => {
  tableData.push({ label, quantity, percentage });
};

const ExchangeRateTableBuilder = {
  build({
    accountsTokens,
    abrTokens,
    allTokens,
    vbrTokens,
    bondedTokens,
    denom,
  }) {
    addTotalValidatorData();
    addTotalLiquidityPoolData();
    addTotalCommunityData();
    addTotalFundsData();
    //FIXME: update params
    const exchangeRate = getExchangeRate(1, 1);
    return { tableData, exchangeRate };
  },
};

export default ExchangeRateTableBuilder;

const addTotalValidatorData = () => {};
const addTotalLiquidityPoolData = () => {};
const addTotalCommunityData = () => {};
const addTotalFundsData = () => {};

const getExchangeRate = (totalCirculating, total) =>
  1 / (totalCirculating / total);
