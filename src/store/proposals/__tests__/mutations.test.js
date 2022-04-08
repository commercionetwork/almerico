import { initState } from '../index';
import mutations from '../mutations';

describe('store/proposals/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.list = [{ id: 1 }];
    state.isAdding = true;
    state.pagination = {
      next_key: 'next_key',
      total: '1000',
    };
    state.offset = 10;
    state.detail = { id: 1 };

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

  test('mutations.setProposals', () => {
    const payload = [{ id: 1 }];

    mutations.setProposals(state, payload);

    expect(state.list).toStrictEqual(payload);
  });

  test('mutations.addProposals', () => {
    state.list = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addProposals(state, payload);

    expect(state.list).toStrictEqual(expected);
  });

  test('mutations.setAdding', () => {
    mutations.setAdding(state, true);

    expect(state.isAdding).toBe(true);
  });

  test('mutations.setPagination', () => {
    const payload = {
      next_key: 'next_key',
      total: '1000',
    };

    mutations.setPagination(state, payload);

    expect(state.pagination).toStrictEqual(payload);
  });

  test('mutations.setOffset', () => {
    const payload = 10;
    mutations.setOffset(state, payload);

    expect(state.offset).toBe(payload);
  });

  test('mutations.sumOffset', () => {
    const payload = 10;
    state.offset = payload;

    mutations.sumOffset(state, payload);

    expect(state.offset).toBe(payload + payload);
  });

  test('mutations.setDetail', () => {
    const payload = { id: 1 };
    mutations.setDetail(state, payload);

    expect(state.detail).toStrictEqual(payload);
  });
});
