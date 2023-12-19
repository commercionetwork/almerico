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
      return {
        address: embedded2.address,
        ...embedded2.data,
      };
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
  embedded.data[`${key}_id`] = tokens[index]['id'];
  embedded.data[`${key}_name`] = tokens[index]['name'];
  embedded.data[`${key}_symbol`] = tokens[index]['symbol'];
  embedded.data[`${key}_amount`] = tokens[index]['amount'];
  embedded.data[`${key}_decimals`] = tokens[index]['decimals'];
  return embedded;
};
