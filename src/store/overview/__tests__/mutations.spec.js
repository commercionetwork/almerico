import mutations from '../mutations';
import { initialState } from '../index';

describe('store/overview/mutations', () => {
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
});
