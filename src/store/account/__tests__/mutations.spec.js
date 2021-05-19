import mutations from '../mutations';
import store from '../index';

describe('store/account/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...store.initialState,
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

  test('mutations.setBalances', () => {
    const balances = [
      {
        id: 1,
      },
    ];

    mutations.setBalances(state, balances);

    expect(state.balances).toStrictEqual(balances);
  });

  test('mutations.setDelegations', () => {
    const delegations = [
      {
        id: 1,
      },
    ];

    mutations.setDelegations(state, delegations);

    expect(state.delegations).toStrictEqual(delegations);
  });

  test('mutations.setUnbondings', () => {
    const unbondings = [
      {
        id: 1,
      },
    ];

    mutations.setUnbondings(state, unbondings);

    expect(state.unbondings).toStrictEqual(unbondings);
  });

  test('mutations.setMembership', () => {
    const membership = {
      id: 1,
    };

    mutations.setMembership(state, membership);

    expect(state.membership).toStrictEqual(membership);
  });

  test('mutations.setBuyMembershipTx', () => {
    const tx = {
      id: 1,
    };

    mutations.setBuyMembershipTx(state, tx);

    expect(state.buyMembershipTx).toStrictEqual(tx);
  });

  test('mutations.setRewards', () => {
    const rewards = {
      id: 1,
    };

    mutations.setRewards(state, rewards);

    expect(state.rewards).toStrictEqual(rewards);
  });
});
