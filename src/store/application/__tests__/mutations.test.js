import { initState } from '../index';
import mutations from '../mutations';

describe('store/application/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.eventHeight = { id: 1 };
    state.info = { id: 1 };
    state.latestTransactions = [{ id: 1 }];
    state.validatorsOffset = 10;
    state.latestBlock = { id: 1 };
    state.latestValidatorSets = [{ id: 1 }];
    state.maintenance = true;
    state.stakingParams = { id: 1 };
    state.validators = [{ id: 1 }];
    state.validatorsPagination = { id: 1 };

    const expected = initState();

    mutations.reset(state);

    expect(state).toStrictEqual(expected);
  });

  test('mutations.setError', () => {
    const payload = { message: 'error' };

    mutations.setError(state, payload);

    expect(state.error).toBe(payload);
  });

  test('mutations.setLoading', () => {
    mutations.setLoading(state, true);

    expect(state.isLoading).toBe(true);
  });

  test('mutations.setMaintenance', () => {
    mutations.setMaintenance(state, true);

    expect(state.maintenance).toBe(true);
  });

  test('mutations.setEventHeight', () => {
    const payload = { id: 1 };
    mutations.setEventHeight(state, payload);

    expect(state.eventHeight).toStrictEqual(payload);
  });

  test('mutations.setInfo', () => {
    const payload = { id: 1 };
    mutations.setInfo(state, payload);

    expect(state.info).toStrictEqual(payload);
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

  test('mutations.setValidatorsOffset', () => {
    const payload = 10;
    mutations.setValidatorsOffset(state, payload);

    expect(state.validatorsOffset).toBe(payload);
  });

  test('mutations.sumValidatorsOffset', () => {
    const payload = 10;
    mutations.sumValidatorsOffset(state, payload);

    expect(state.validatorsOffset).toBe(payload);

    mutations.sumValidatorsOffset(state, payload);

    expect(state.validatorsOffset).toBe(payload + payload);
  });

  test('mutations.setValidatorsPagination', () => {
    const payload = { id: 1 };
    mutations.setValidatorsPagination(state, payload);

    expect(state.validatorsPagination).toStrictEqual(payload);
  });
});
