export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isHandling: (state) => state.isHandling,
  supply: (state) => state.supply,
  list: (state) => state.list,
  balances: (state) => state.balances,
  modal: (state) => state.modal,
  detail: (state) => state.detail,
  contract: (state) => (state.detail ? state.detail.id : ''),
  newCW20: (state) => state.newCW20,
  isValidCW20: (state) => !state.isInvalid,
  government: (state) => state.government,
};
