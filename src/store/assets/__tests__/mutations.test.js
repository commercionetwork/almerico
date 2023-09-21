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
    state.list = [{ id: 1 }];
    state.detail = { id: 1 };

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

  test('mutations.addContract', () => {
    const payload = { id: 1 };

    mutations.addContract(state, payload);

    expect(state.list).toStrictEqual([payload]);
  });

  test('mutations.setDetail', () => {
    const payload = { id: 1 };

    mutations.setDetail(state, payload);

    expect(state.detail).toStrictEqual(payload);
  });
});
