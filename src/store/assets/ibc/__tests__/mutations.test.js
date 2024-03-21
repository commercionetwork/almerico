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
    state.connection = { id: 1 };
    state.modal = { id: 1 };

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

  test('mutations.setConnection', () => {
    const payload = { id: 1 };

    mutations.setConnection(state, payload);

    expect(state.connection).toStrictEqual(payload);
  });

  test('mutations.addConnectionProp', () => {
    state.connection = { path_1: { id: 1 } };

    mutations.addConnectionProp(state, { path: 'path_2', value: { id: 2 } });

    const expected = { path_1: { id: 1 }, path_2: { id: 2 } };
    expect(state.connection).toStrictEqual(expected);
  });

  test('mutations.setModal', () => {
    const payload = { id: 1 };

    mutations.setModal(state, payload);

    expect(state.modal).toStrictEqual(payload);
  });
});
