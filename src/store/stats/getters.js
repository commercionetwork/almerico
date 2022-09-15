export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  wallets: (state) => _mergeWallets(state.wallets),
};

const _mergeWallets = (items) => {
  const result = items.reduce((acc, { address, value }) => {
    acc[address] ??= { address: address, value: [] };
    if (Array.isArray(value)) {
      acc[address].value = acc[address].value.concat(value);
    } else {
      acc[address].value.push(value);
    }
    return acc;
  }, {});
  return result;
};
