import actions from '../actions.js';

describe('store/dex/list/actions', () => {
  test('if "initDexList" reset store, set loading state, dispatch wanted actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initDexList({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchContracts');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });
});
