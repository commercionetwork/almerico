import mutations from '../mutations';
import { initialState } from '../index';

describe('store/starting/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  test('mutations.startLoading', () => {
    state.error = { message: 'error', status: 400 };

    mutations.startLoading(state);

    expect(state.error).toBeNull;
    expect(state.isLoading).toBe(true);
  });

  test('mutations.stopLoading', () => {
    state.isLoading = true;

    mutations.stopLoading(state);

    expect(state.isLoading).toBe(false);
  });

  test('mutations.setError', () => {
    const error = { message: 'error', status: 400 };

    mutations.setError(state, error);

    expect(state.error).toStrictEqual(error);
  });

  test('mutations.setNodeInfo', () => {
    const nodeInfo = {
      id: 1,
    };

    mutations.setNodeInfo(state, nodeInfo);

    expect(state.nodeInfo).toStrictEqual(nodeInfo);
  });

  test('mutations.setParams', () => {
    const params = {
      id: 1,
    };

    mutations.setParams(state, params);

    expect(state.params).toStrictEqual(params);
  });

  test('mutations.setPool', () => {
    const pool = {
      id: 1,
    };

    mutations.setPool(state, pool);

    expect(state.pool).toStrictEqual(pool);
  });

  test('mutations.setTokens', () => {
    const tokens = [
      {
        denom: 'ucommercio',
        amount: '59999952300200',
      },
    ];

    mutations.setTokens(state, tokens);

    expect(state.tokens).toStrictEqual(tokens);
  });
});
