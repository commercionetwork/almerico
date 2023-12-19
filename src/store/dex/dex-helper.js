import { CONTRACT } from '@/constants';

const dexHelper = {
  mergeBankWasmsTokens({ bankTokens, wasmsTokens }) {
    const tokens = [];
    bankTokens.forEach((token) => {
      const name = token.denom.substring(1);
      const availables = formatBalance(token.amount, 6);
      tokens.push({
        id: token.denom,
        name,
        symbol: name.toUpperCase(),
        availables,
        amount: token.amount,
        decimals: 6,
        type: CONTRACT.TOKEN.TYPE.NATIVE,
      });
    });
    wasmsTokens.forEach((token) => {
      const availables = formatBalance(token.balance, token.decimals);
      tokens.push({
        id: token.contract,
        name: token.name,
        symbol: token.symbol,
        availables,
        amount: token.balance,
        decimals: token.decimals,
        type: CONTRACT.TOKEN.TYPE.CW20,
      });
    });
    return tokens;
  },
};

export default dexHelper;

const formatBalance = (amount, decimals = 0) => {
  const balance = amount / Math.pow(10, decimals);
  return new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(balance);
};
