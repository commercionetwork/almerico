import { initState } from '../index';
import mutations from '../mutations';

describe('store/assets/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.isHandling = true;
    state.channels = [{ id: 1 }];
    state.supply = [{ id: 1 }];
    state.list = [{ id: 1 }];
    state.balances = { path_1: [{ id: 1 }] };
    state.modal = { id: 1 };
    state.detail = { id: 1 };
    state.newCW20 = { id: 1 };
    state.isInvalid = false;
    state.government = 'government';

    const expected = initState();

    mutations.reset(state);

    expect(state).toStrictEqual(expected);
  });

  test('mutations.setError', () => {
    const payload = new Error('error');

    mutations.setError(state, payload);

    expect(state.error).toBe(payload);
  });

  test('mutations.setLoading', () => {
    mutations.setLoading(state, true);

    expect(state.isLoading).toBe(true);
  });

  test('mutations.setHandling', () => {
    mutations.setHandling(state, true);

    expect(state.isHandling).toBe(true);
  });

  test('mutations.setChannels', () => {
    const payload = [{ id: 1 }];

    mutations.setChannels(state, payload);

    expect(state.channels).toStrictEqual(payload);
  });

  test('mutations.setSupply', () => {
    const payload = [{ id: 1 }];

    mutations.setSupply(state, payload);

    expect(state.supply).toStrictEqual(payload);
  });

  test('mutations.addBalancesProp', () => {
    state.balances = { path_1: [{ id: 1 }] };

    mutations.addBalancesProp(state, { path: 'path_2', value: [{ id: 2 }] });

    const expected = { path_1: [{ id: 1 }], path_2: [{ id: 2 }] };
    expect(state.balances).toStrictEqual(expected);
  });

  test('mutations.addContract', () => {
    const payload = { id: 1 };

    mutations.addContract(state, payload);

    expect(state.list).toStrictEqual([payload]);
  });

  test('mutations.setModal', () => {
    const payload = { id: 1 };

    mutations.setModal(state, payload);

    expect(state.modal).toStrictEqual(payload);
  });

  test('mutations.setDetail', () => {
    const payload = { id: 1 };

    mutations.setDetail(state, payload);

    expect(state.detail).toStrictEqual(payload);
  });

  test('mutations.addPropToNewCW20', () => {
    state.newCW20 = { id: 1 };
    const payload = { name: 'name' };
    const expected = { id: 1, name: 'name' };

    mutations.addPropToNewCW20(state, payload);

    expect(state.newCW20).toStrictEqual(expected);
  });

  test('mutations.setIsInvalid', () => {
    mutations.setIsInvalid(state, false);

    expect(state.isInvalid).toBe(false);
  });

  test('mutations.setGovernment', () => {
    const payload = 'government';

    mutations.setGovernment(state, payload);

    expect(state.government).toBe(payload);
  });
});
