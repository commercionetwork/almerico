import { CONTRACT } from '@/constants';

export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isHandling: (state) => state.isHandling,
  hasWallet: (state) => state.hasWallet,
  balances: (state) => state.balances,
  contract: (state) => state.contract,
  token1: (state) =>
    buildToken(state.contract['info'], CONTRACT.TOKEN.DENOM.TOKEN_1),
  token2: (state) =>
    buildToken(state.contract['info'], CONTRACT.TOKEN.DENOM.TOKEN_2),
};

const buildToken = (data, denom) => {
  const name = data[`${denom}_denom`][CONTRACT.TOKEN.TYPE.NATIVE];
  return {
    denom: name,
    label: CONTRACT.TOKEN.LABEL[name],
    reserve: data[`${denom}_reserve`],
  };
};
