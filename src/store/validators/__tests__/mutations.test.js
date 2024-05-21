import { VALIDATORS } from '@/constants';
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
    state.isUpdating = true;
    state.detail = { id: 1 };
    state.missedBlocksCounter = 1;
    state.list = [{ id: 1 }];
    state.delegations = [{ id: 1 }];
    state.delegationsPagination = { next_key: 'key', total: 25 };
    state.filter = {
      status: VALIDATORS.FILTER.INACTIVE,
      query: 'abc',
    };
    state.isLoadingWallet = true;
    state.wallet = [{ balances: [{ id: 1 }] }];
    state.walletDelegationsPagination = { next_key: 'key', total: 25 };
    state.walletUnbondingsPagination = { next_key: 'key', total: 25 };

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

  test('mutations.setUpdating', () => {
    mutations.setUpdating(state, true);

    expect(state.isUpdating).toBe(true);
  });

  test('mutations.setDetail', () => {
    const detail = { id: 1 };

    mutations.setDetail(state, detail);

    expect(state.detail).toStrictEqual(detail);
  });

  test('mutations.setMissedBlocksCounter', () => {
    const missedBlocksCounter = 1;

    mutations.setMissedBlocksCounter(state, missedBlocksCounter);

    expect(state.missedBlocksCounter).toBe(missedBlocksCounter);
  });

  test('mutations.setList', () => {
    const items = [{ id: 1 }];

    mutations.setList(state, items);

    expect(state.list).toStrictEqual(items);
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

  test('mutations.setDelegationsPagination', () => {
    const pagination = {
      next_key: 'string',
      total: 'string',
    };

    mutations.setDelegationsPagination(state, pagination);

    expect(state.delegationsPagination).toStrictEqual(pagination);
  });

  test('mutations.setFilter', () => {
    const filter = 'filter';

    mutations.setFilter(state, filter);

    expect(state.filter).toBe(filter);
  });

  test('mutations.setLoadingWallet', () => {
    mutations.setLoadingWallet(state, true);

    expect(state.isLoadingWallet).toBe(true);
  });

  test('mutations.setWalletItem', () => {
    state.wallet = {
      balances: [{ id: 1 }],
    };

    mutations.setWalletItem(state, { delegations: [{ id: 1 }] });

    const expected = {
      balances: [{ id: 1 }],
      delegations: [{ id: 1 }],
    };

    expect(state.wallet).toStrictEqual(expected);
  });

  test('mutations.addWalletDelegations', () => {
    state.wallet = {
      delegations: [{ id: 1 }],
    };

    mutations.addWalletDelegations(state, [{ id: 2 }]);

    const expected = {
      delegations: [{ id: 1 }, { id: 2 }],
    };

    expect(state.wallet).toStrictEqual(expected);
  });

  test('mutations.addWalletUnbondings', () => {
    state.wallet = {
      unbondings: [{ id: 1 }],
    };

    mutations.addWalletUnbondings(state, [{ id: 2 }]);

    const expected = {
      unbondings: [{ id: 1 }, { id: 2 }],
    };

    expect(state.wallet).toStrictEqual(expected);
  });

  test('mutations.setWalletDelegationsPagination', () => {
    const pagination = {
      next_key: 'string',
      total: 'string',
    };

    mutations.setWalletDelegationsPagination(state, pagination);

    expect(state.walletDelegationsPagination).toStrictEqual(pagination);
  });

  test('mutations.setWalletUnbondingsPagination', () => {
    const pagination = {
      next_key: 'string',
      total: 'string',
    };

    mutations.setWalletUnbondingsPagination(state, pagination);

    expect(state.walletUnbondingsPagination).toStrictEqual(pagination);
  });

  test('mutations.resetWallet', () => {
    state.wallet = {
      balances: [{ id: 1 }],
      delegations: [],
      rewards: [],
      unbondings: [],
    };
    state.walletDelegationsPagination = { next_key: 'key', total: 25 };
    state.walletUnbondingsPagination = { next_key: 'key', total: 25 };

    mutations.resetWallet(state);

    const expected = {
      balances: [],
      delegations: [],
      rewards: [],
      unbondings: [],
    };

    expect(state.wallet).toStrictEqual(expected);
    expect(state.walletDelegationsPagination).toBeNull();
    expect(state.walletUnbondingsPagination).toBeNull();
  });
});
