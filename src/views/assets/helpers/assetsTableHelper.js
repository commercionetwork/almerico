import { CONFIG, CONTRACT } from '@/constants';

const assetsTableHelper = {
  buildItems({ balances = undefined, list, supply } = {}) {
    const items = adaptSupply({
      balances,
      supply,
    });
    const cw20s = adaptCW20s({
      balances,
      list,
    });
    for (const cw20 of cw20s) {
      items.push({
        decimals: cw20.decimals,
        name: cw20.name,
        symbol: cw20.symbol,
        total_supply: cw20.total_supply,
        balance: cw20.balance,
      });
    }
    return items;
  },
};

export default assetsTableHelper;

const adaptSupply = ({ balances, supply }) => {
  const ccc = supply.find((item) => item.denom === CONFIG.STABLE_COIN.DENOM);
  const commercio = supply.find((item) => item.denom === CONFIG.TOKEN.DENOM);
  const items = [
    {
      id: CONFIG.STABLE_COIN.DENOM,
      decimals: CONFIG.STABLE_COIN.EXPONENT,
      name: CONFIG.STABLE_COIN.SYMBOL,
      symbol: CONFIG.STABLE_COIN.SYMBOL,
      total_supply: ccc.amount,
    },
    {
      id: CONFIG.TOKEN.DENOM,
      decimals: CONFIG.TOKEN.EXPONENT,
      name: CONFIG.TOKEN.NAME,
      symbol: CONFIG.TOKEN.SYMBOL,
      total_supply: commercio.amount,
    },
  ];
  const nativeBalances = balances ? balances[CONTRACT.TOKEN.TYPE.NATIVE] : [];
  if (!nativeBalances.length) {
    return items;
  }
  return items.map((item) => {
    const balance = nativeBalances.find((balance) => balance.denom === item.id);
    return {
      decimals: item.decimals,
      name: item.name,
      symbol: item.symbol,
      total_supply: item.total_supply,
      balance: balance ? balance.amount : '0',
    };
  });
};

const adaptCW20s = ({ balances, list }) => {
  const items = list.filter((item) => item.symbol !== 'wslpt');
  const cw20Balances = balances ? balances[CONTRACT.TOKEN.TYPE.CW20] : [];
  if (!cw20Balances.length) {
    return items;
  }
  return items.map((item) => {
    const balance = cw20Balances.find(
      (balance) => balance.contract === item.id
    );
    return {
      decimals: item.decimals,
      name: item.name,
      symbol: item.symbol,
      total_supply: item.total_supply,
      balance: balance ? balance.balance : '0',
    };
  });
};
