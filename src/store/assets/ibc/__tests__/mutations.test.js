import { initState } from '../index';
import mutations from '../mutations';

describe('store/assetsIbc/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.isHandling = true;
    state.modal = { id: 1 };
    state.connections = [{ id: 1 }];

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

  test('mutations.setModal', () => {
    const payload = { id: 1 };

    mutations.setModal(state, payload);

    expect(state.modal).toStrictEqual(payload);
  });

  test('mutations.addModalProp', () => {
    state.modal = { id: 1 };

    const payload = { path: 'name', value: 'test' };

    mutations.addModalProp(state, payload);

    expect(state.modal).toStrictEqual({ id: 1, name: 'test' });
  });

  test('mutations.setConnections', () => {
    const payload = [{ id: 1 }];

    mutations.setConnections(state, payload);

    expect(state.connections).toStrictEqual(payload);
  });

  test('mutations.addConnection', () => {
    state.connections = [{ id: 1 }];
    const payload = { id: 2 };
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addConnection(state, payload);

    expect(state.connections).toStrictEqual(expected);
  });
});
