import mutations from '../mutations';
import store from '../index';

describe('store/account/mutations', () => {
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

  test('mutations.setBalances', () => {
    const balances = [{ id: 1 }];

    mutations.setBalances(state, balances);

    expect(state.balances).toStrictEqual(balances);
  });

  test('mutations.setDelegations', () => {
    const delegations = [{ id: 1 }];

    mutations.setDelegations(state, delegations);

    expect(state.delegations).toStrictEqual(delegations);
  });

  test('mutations.setRewards', () => {
    const rewards = { rewards: [{ id: 1 }], total: [{ id: 1 }] };

    mutations.setRewards(state, rewards);

    expect(state.rewards).toStrictEqual(rewards);
  });

  test('mutations.setUnbondings', () => {
    const unbondings = [{ id: 1 }];

    mutations.setUnbondings(state, unbondings);

    expect(state.unbondings).toStrictEqual(unbondings);
  });

  test('mutations.addUnbondings', () => {
    state.unbondings = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addUnbondings(state, payload);

    expect(state.unbondings).toStrictEqual(expected);
  });

  test('mutations.setUnbondingsOffset', () => {
    const payload = 10;
    mutations.setUnbondingsOffset(state, payload);

    expect(state.unbondingsOffset).toBe(payload);
  });

  test('mutations.sumUnbondingsOffset', () => {
    const payload = 10;
    mutations.sumUnbondingsOffset(state, payload);

    expect(state.unbondingsOffset).toBe(payload);

    mutations.sumUnbondingsOffset(state, payload);

    expect(state.unbondingsOffset).toBe(payload + payload);
  });

  test('mutations.setUnbondingsPagination', () => {
    const pagination = {
      next_key: 'string',
      total: 'string',
    };

    mutations.setUnbondingsPagination(state, pagination);

    expect(state.unbondingsPagination).toStrictEqual(pagination);
  });

  test('mutations.setMembership', () => {
    const membership = { id: 1 };

    mutations.setMembership(state, membership);

    expect(state.membership).toStrictEqual(membership);
  });

  test('mutations.setMembershipTxs', () => {
    const tx = [{ id: 1 }];

    mutations.setMembershipTxs(state, tx);

    expect(state.membershipTxs).toStrictEqual(tx);
  });

  test('mutations.setAddingTxs', () => {
    mutations.setAddingTxs(state, true);

    expect(state.isAddingTxs).toBe(true);
  });

  test('mutations.setTransactions', () => {
    const payload = [{ id: 1 }];
    mutations.setTransactions(state, payload);

    expect(state.transactions).toStrictEqual(payload);
  });

  test('mutations.addTransactions', () => {
    state.transactions = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];
    mutations.addTransactions(state, payload);

    expect(state.transactions).toStrictEqual(expected);
  });

  test('mutations.setTransactionsOffset', () => {
    const payload = 10;
    mutations.setTransactionsOffset(state, payload);

    expect(state.transactionsOffset).toBe(payload);
  });

  test('mutations.sumTransactionsOffset', () => {
    const payload = 10;
    mutations.sumTransactionsOffset(state, payload);

    expect(state.transactionsOffset).toBe(payload);

    mutations.sumTransactionsOffset(state, payload);

    expect(state.transactionsOffset).toBe(payload + payload);
  });

  test('mutations.setTransactionsPagination', () => {
    const pagination = {
      next_key: 'string',
      total: 'string',
    };

    mutations.setTransactionsPagination(state, pagination);

    expect(state.transactionsPagination).toStrictEqual(pagination);
  });
});
