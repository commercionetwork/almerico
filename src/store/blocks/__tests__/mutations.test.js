import { initState } from '../index';
import mutations from '../mutations';

describe('store/blocks/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.blockTxs = [{ id: 1 }];
    state.blockTxsOffset = 10;
    state.blockTxsPagination = {
      next_key: 'string',
      total: 'string',
    };
    state.blockValidatorSets = [{ id: 1 }];
    state.blocks = [{ id: 1 }];
    state.currentHeight = 100;
    state.detail = { id: 1 };
    state.isAddingBlocks = true;
    state.isSearching = true;
    state.newHeight = 100;
    state.supposedTime = { id: 1 };

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

  test('mutations.setAddingBlocks', () => {
    mutations.setAddingBlocks(state, true);

    expect(state.isAddingBlocks).toBe(true);
  });

  test('mutations.setSearching', () => {
    mutations.setSearching(state, true);

    expect(state.isSearching).toBe(true);
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

  test('mutations.setSupposedTime', () => {
    const payload = { id: 1 };
    mutations.setSupposedTime(state, payload);

    expect(state.supposedTime).toStrictEqual(payload);
  });
});
