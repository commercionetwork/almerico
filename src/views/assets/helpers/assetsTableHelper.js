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
        id: cw20.id,
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
      type: CONTRACT.TOKEN.TYPE.NATIVE,
    },
    {
      id: CONFIG.TOKEN.DENOM,
      decimals: CONFIG.TOKEN.EXPONENT,
      name: CONFIG.TOKEN.NAME,
      symbol: CONFIG.TOKEN.SYMBOL,
      total_supply: commercio.amount,
      type: CONTRACT.TOKEN.TYPE.NATIVE,
    },
  ];
  const nativeBalances = balances ? balances[CONTRACT.TOKEN.TYPE.NATIVE] : [];
  if (!nativeBalances.length) {
    return items.map((item) => Object.assign(item, { balance: 0 }));
  }
  return items.map((item) => {
    const balance = nativeBalances.find((balance) => balance.denom === item.id);
    return {
      balance: balance ? parseFloat(balance.amount) : 0,
      decimals: item.decimals,
      name: item.name,
      symbol: item.symbol,
      total_supply: item.total_supply,
      type: item.type,
    };
  });
};

const adaptCW20s = ({ balances, list }) => {
  const items = list
    .filter((item) => item.symbol !== 'wslpt')
    .map((item) => Object.assign(item, { type: CONTRACT.TOKEN.TYPE.CW20 }));
  const cw20Balances = balances ? balances[CONTRACT.TOKEN.TYPE.CW20] : [];
  if (!cw20Balances.length) {
    return items.map((item) => Object.assign(item, { balance: 0 }));
  }
  return items.map((item) => {
    const balance = cw20Balances.find(
      (balance) => balance.contract === item.id
    );
    return {
      id: item.id,
      balance: balance ? parseFloat(balance.balance) : 0,
      decimals: item.decimals,
      name: item.name,
      symbol: item.symbol,
      total_supply: item.total_supply,
      type: item.type,
    };
  });
};
