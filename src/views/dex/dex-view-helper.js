import { CONTRACT } from '@/constants';

const dexViewHelper = {
  getItems({ contracts, tokens }) {
    const items = contracts.map((contract) => {
      const embedded1 = embedSwapContract({
        contract,
        key: CONTRACT.TOKEN.DENOM.TOKEN_1,
        tokens,
      });
      if (!embedded1) return null;
      const embedded2 = embedSwapContract({
        contract: embedded1,
        key: CONTRACT.TOKEN.DENOM.TOKEN_2,
        tokens,
      });
      if (!embedded2) return null;
      const item = {
        id: embedded2.id,
        lp: {
          address: embedded2.data.lp_token_address,
          supply: embedded2.data.lp_token_supply,
        },
        ...embedded2.data,
      };
      item.lp_token_address = undefined;
      item.lp_token_supply = undefined;
      return item;
    });
    // Remove null items
    return items.filter(Boolean);
  },
};

export default dexViewHelper;

const embedSwapContract = ({ contract, key, tokens }) => {
  const embedded = JSON.parse(JSON.stringify(contract));
  const fullKey = `${key}_denom`;
  const index = tokens.findIndex(
    (token) =>
      token.id === embedded.data[fullKey][CONTRACT.TOKEN.TYPE.NATIVE] ||
      token.id === embedded.data[fullKey][CONTRACT.TOKEN.TYPE.CW20]
  );
  if (index < 0) {
    return null;
  }
  embedded.data[key] = {};
  embedded.data[key]['id'] = tokens[index]['id'];
  embedded.data[key]['name'] = tokens[index]['name'];
  embedded.data[key]['symbol'] = tokens[index]['symbol'];
  embedded.data[key]['amount'] = tokens[index]['amount'];
  embedded.data[key]['decimals'] = tokens[index]['decimals'];
  embedded.data[key]['denom'] = embedded.data[`${key}_denom`];
  embedded.data[key]['reserve'] = embedded.data[`${key}_reserve`];
  embedded.data[`${key}_denom`] = undefined;
  embedded.data[`${key}_reserve`] = undefined;
  return embedded;
};
