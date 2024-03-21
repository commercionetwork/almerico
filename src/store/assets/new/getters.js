export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isHandling: (state) => state.isHandling,
  isValidCW20: (state) => !state.isInvalid,
  government: (state) => state.government,
  newCW20: (state) => state.newCW20,
};
