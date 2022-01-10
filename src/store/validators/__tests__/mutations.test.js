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
    state.blocks = [{ id: 1 }];
    state.pool = { id: 1 };

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

  test('mutations.setBlocks', () => {
    const blocks = [{ id: 1 }];

    mutations.setBlocks(state, blocks);

    expect(state.blocks).toStrictEqual(blocks);
  });

  test('mutations.addBlock', () => {
    state.blocks = [{ id: 1 }];
    const payload = { id: 2 };
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addBlock(state, payload);

    expect(state.blocks).toStrictEqual(expected);
  });

  test('mutations.setNewHeight', () => {
    const newHeight = '1';

    mutations.setNewHeight(state, newHeight);

    expect(state.newHeight).toBe(newHeight);
  });

  test('mutations.setFilter', () => {
    const filter = 'filter';

    mutations.setFilter(state, filter);

    expect(state.filter).toBe(filter);
  });

  test('mutations.setPool', () => {
    const pool = { id: 1 };

    mutations.setPool(state, pool);

    expect(state.pool).toStrictEqual(pool);
  });

  test('mutations.setDetail', () => {
    const detail = { id: 1 };

    mutations.setDetail(state, detail);

    expect(state.detail).toStrictEqual(detail);
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
});
