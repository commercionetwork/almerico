import mutations from '../mutations';
import store from '../index';

describe('store/overview/mutations', () => {
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

  test('mutations.setAbrTokens', () => {
    const data = [
      {
        denom: 'ucommercio',
        amount: '11500000000000',
      },
    ];

    mutations.setAbrTokens(state, data);

    expect(state.abrTokens).toStrictEqual(data);
  });

  test('mutations.setVbrTokens', () => {
    const data = [
      {
        denom: 'ucommercio',
        amount: '12363544370772.000000000000000000',
      },
    ];

    mutations.setVbrTokens(state, data);

    expect(state.vbrTokens).toStrictEqual(data);
  });

  test('mutations.addAccountTokens', () => {
    const data = {
      name: 'validator',
      address: 'did:com:1ke2h5tzpcsyak62ltaf45ca8ppzfuye6qasur6',
      balance: [
        {
          denom: 'ucommercio',
          amount: '8099619600000',
        },
      ],
    };

    mutations.addAccountTokens(state, data);

    expect(state.accountsTokens).toStrictEqual([data]);
  });
});
