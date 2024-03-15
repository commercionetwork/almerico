import { CONFIG } from '@/constants';

const assetsTableHelper = {
  buildItems({ supply, list }) {
    const items = adaptSupply(supply);
    const cw20s = removeWslptFromList(list);
    for (const cw20 of cw20s) {
      items.push({
        decimals: cw20.decimals,
        name: cw20.name,
        symbol: cw20.symbol,
        total_supply: cw20.total_supply,
      });
    }
    return items;
  },
};

export default assetsTableHelper;

const adaptSupply = (supply) => {
  const ccc = supply.find((item) => item.denom === CONFIG.STABLE_COIN.DENOM);
  const commercio = supply.find((item) => item.denom === CONFIG.TOKEN.DENOM);
  return [
    {
      decimals: CONFIG.STABLE_COIN.EXPONENT,
      name: CONFIG.STABLE_COIN.SYMBOL,
      symbol: CONFIG.STABLE_COIN.SYMBOL,
      total_supply: ccc.amount,
    },
    {
      decimals: CONFIG.TOKEN.EXPONENT,
      name: CONFIG.TOKEN.NAME,
      symbol: CONFIG.TOKEN.SYMBOL,
      total_supply: commercio.amount,
    },
  ];
};

const removeWslptFromList = (list) =>
  list.filter((item) => item.symbol !== 'wslpt');
