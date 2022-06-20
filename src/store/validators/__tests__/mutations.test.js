import { VALIDATORS } from '@/constants';
import { initState } from '../index';
import mutations from '../mutations';

describe('store/validators/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.isUpdating = true;
    state.detail = { id: 1 };
    state.list = [{ id: 1 }];
    state.delegations = [{ id: 1 }];
    state.delegationsOffset = 1;
    state.delegationsPagination = { total: 25 };
    state.filter = {
      status: VALIDATORS.FILTER.INACTIVE,
      query: 'abc',
    };

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

  test('mutations.setUpdating', () => {
    mutations.setUpdating(state, true);

    expect(state.isUpdating).toBe(true);
  });

  test('mutations.setDetail', () => {
    const detail = { id: 1 };

    mutations.setDetail(state, detail);

    expect(state.detail).toStrictEqual(detail);
  });

  test('mutations.setList', () => {
    const items = [{ id: 1 }];

    mutations.setList(state, items);

    expect(state.list).toStrictEqual(items);
  });

  test('mutations.setDelegations', () => {
    const delegations = [{ id: 1 }];

    mutations.setDelegations(state, delegations);

    expect(state.delegations).toStrictEqual(delegations);
  });

  test('mutations.addDelegations', () => {
    state.delegations = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addDelegations(state, payload);

    expect(state.delegations).toStrictEqual(expected);
  });

  test('mutations.setDelegationsOffset', () => {
    const payload = 10;
    mutations.setDelegationsOffset(state, payload);

    expect(state.delegationsOffset).toBe(payload);
  });

  test('mutations.sumDelegationsOffset', () => {
    const payload = 10;
    mutations.sumDelegationsOffset(state, payload);

    expect(state.delegationsOffset).toBe(payload);

    mutations.sumDelegationsOffset(state, payload);

    expect(state.delegationsOffset).toBe(payload + payload);
  });

  test('mutations.setDelegationsPagination', () => {
    const pagination = {
      next_key: 'string',
      total: 'string',
    };

    mutations.setDelegationsPagination(state, pagination);

    expect(state.delegationsPagination).toStrictEqual(pagination);
  });

  test('mutations.setFilter', () => {
    const filter = 'filter';

    mutations.setFilter(state, filter);

    expect(state.filter).toBe(filter);
  });
});
