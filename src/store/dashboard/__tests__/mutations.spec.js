import mutations from '../mutations';
import { initialState } from '../index';

describe('store/dashboard/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  test('mutations.startLoading', () => {
    state.error = { message: 'error', status: 400 };

    mutations.startLoading(state);

    expect(state.error).toBeNull;
    expect(state.isLoading).toBe(true);
  });

  test('mutations.stopLoading', () => {
    state.isLoading = true;

    mutations.stopLoading(state);

    expect(state.isLoading).toBe(false);
  });

  test('mutations.setError', () => {
    const error = { message: 'error', status: 400 };

    mutations.setError(state, error);

    expect(state.error).toStrictEqual(error);
  });

  test('mutations.setConversionRate', () => {
    const rate = '1.000000000000000000';

    mutations.setConversionRate(state, rate);

    expect(state.conversionRate).toBe(rate);
  });

  test('mutations.setRateUpdates', () => {
    const txs = [
      {
        id: 1,
      },
    ];

    mutations.setRateUpdates(state, txs);

    expect(state.rateUpdates).toStrictEqual(txs);
  });

  test('mutations.setStartingDate', () => {
    const date = '2021-02-11T15:58:02.264848898Z';

    mutations.setStartingDate(state, date);

    expect(state.startingDate).toBe(date);
  });
});
