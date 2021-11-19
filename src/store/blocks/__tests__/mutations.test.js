import mutations from '../mutations';
import store from '../index';

describe('store/blocks/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...store.initialState,
    };
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

  test('mutations.setAddingBlocks', () => {
    mutations.setAddingBlocks(state, true);

    expect(state.isAddingBlocks).toBe(true);
  });

  test('mutations.setBlocks', () => {
    const payload = [{ id: 1 }];
    mutations.setBlocks(state, payload);

    expect(state.blocks).toStrictEqual(payload);
  });

  test('mutations.addBlock', () => {
    state.blocks = [{ id: 1 }];
    const payload = { id: 2 };
    const expected = [{ id: 1 }, { id: 2 }];
    mutations.addBlock(state, payload);

    expect(state.blocks).toStrictEqual(expected);
  });

  test('mutations.setCurrentHeight', () => {
    const payload = '10';
    mutations.setCurrentHeight(state, payload);

    expect(state.currentHeight).toStrictEqual(payload);
  });

  test('mutations.setNewHeight', () => {
    const payload = '10';
    mutations.setNewHeight(state, payload);

    expect(state.newHeight).toStrictEqual(payload);
  });

  test('mutations.setDetail', () => {
    const payload = { id: 1 };
    mutations.setDetail(state, payload);

    expect(state.detail).toStrictEqual(payload);
  });

  test('mutations.setTransactions', () => {
    const payload = [{ id: 1 }];
    mutations.setTransactions(state, payload);

    expect(state.blockTxs).toStrictEqual(payload);
  });

  test('mutations.addTransactions', () => {
    state.blockTxs = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];
    mutations.addTransactions(state, payload);

    expect(state.blockTxs).toStrictEqual(expected);
  });

  test('mutations.setBlockTxsOffset', () => {
    const payload = 10;
    mutations.setBlockTxsOffset(state, payload);

    expect(state.blockTxsOffset).toBe(payload);
  });

  test('mutations.sumBlockTxsOffset', () => {
    const payload = 10;
    mutations.sumBlockTxsOffset(state, payload);

    expect(state.blockTxsOffset).toBe(payload);

    mutations.sumBlockTxsOffset(state, payload);

    expect(state.blockTxsOffset).toBe(payload + payload);
  });

  test('mutations.setBlockTxsPagination', () => {
    const payload = { next_key: 'next_key', total: 'total' };
    mutations.setBlockTxsPagination(state, payload);

    expect(state.blockTxsPagination).toStrictEqual(payload);
  });

  test('mutations.setValidatorSets', () => {
    const payload = [{ id: 1 }];
    mutations.setValidatorSets(state, payload);

    expect(state.blockValidatorSets).toStrictEqual(payload);
  });
});
