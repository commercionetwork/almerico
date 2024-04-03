import actions from '../actions.js';

describe('store/assetsIbc/actions', () => {
  test('if "handleModal" set the modal data', () => {
    const commit = jest.fn();
    const modal = { id: 1 };

    actions.handleModal({ commit }, modal);

    expect(commit).toHaveBeenCalledWith('setModal', modal);
  });

  test('if "initIBCTransfer" reset connection, set loading state and dispatch wanted actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initIBCTransfer({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('getConnectionChannels');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });
});
