import mutations from '../mutations';
import store from '../index';

describe('store/validators/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...store.initialState,
    };
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
});
