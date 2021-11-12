import mutations from '../mutations';
import store from '../index';

describe('store/application/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...store.initialState,
    };
  });

  test('mutations.setInfo', () => {
    const payload = { id: 1 };
    mutations.setInfo(state, payload);

    expect(state.info).toStrictEqual(payload);
  });

  test('mutations.setLoading', () => {
    mutations.setLoading(state, true);

    expect(state.isLoading).toBe(true);
  });

  test('mutations.setLatestBlock', () => {
    const payload = { id: 1 };
    mutations.setLatestBlock(state, payload);

    expect(state.latestBlock).toStrictEqual(payload);
  });

  test('mutations.setLatestTransactions', () => {
    const payload = [{ id: 1 }];
    mutations.setLatestTransactions(state, payload);

    expect(state.latestTransactions).toStrictEqual(payload);
  });

  test('mutations.addLatestTransactions', () => {
    state.latestTransactions = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];
    mutations.addLatestTransactions(state, payload);

    expect(state.latestTransactions).toStrictEqual(expected);
  });

  test('mutations.setLatestValidatorSets', () => {
    const payload = [{ id: 1 }];
    mutations.setLatestValidatorSets(state, payload);

    expect(state.latestValidatorSets).toStrictEqual(payload);
  });

  test('mutations.setStakingParams', () => {
    const payload = [{ id: 1 }];
    mutations.setStakingParams(state, payload);

    expect(state.stakingParams).toStrictEqual(payload);
  });

  test('mutations.setValidators', () => {
    const payload = [{ id: 1 }];
    mutations.setValidators(state, payload);

    expect(state.validators).toStrictEqual(payload);
  });

  test('mutations.addValidators', () => {
    state.validators = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];
    mutations.addValidators(state, payload);

    expect(state.validators).toStrictEqual(expected);
  });

  test('mutations.setValidatorsPagination', () => {
    const payload = { id: 1 };
    mutations.setValidatorsPagination(state, payload);

    expect(state.validatorsPagination).toStrictEqual(payload);
  });
});
