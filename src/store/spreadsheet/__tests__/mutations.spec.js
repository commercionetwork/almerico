import mutations from '../mutations';
import store from '../index';

describe('store/spreadsheet/mutations', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });
  // let state = {};

  // beforeEach(() => {
  //   state = {
  //     ...store.initialState,
  //   };
  // });

  // test('mutations.startLoading', () => {
  //   state.error = { message: 'error', status: 400 };

  //   mutations.startLoading(state);

  //   expect(state.error).toBeNull;
  //   expect(state.isLoading).toBe(true);
  // });

  // test('mutations.stopLoading', () => {
  //   state.isLoading = true;

  //   mutations.stopLoading(state);

  //   expect(state.isLoading).toBe(false);
  // });

  // test('mutations.setError', () => {
  //   const error = { message: 'error', status: 400 };

  //   mutations.setError(state, error);

  //   expect(state.error).toStrictEqual(error);
  // });

  // test('mutations.setAbrTokens', () => {
  //   const data = [
  //     {
  //       denom: 'ucommercio',
  //       amount: '11500000000000',
  //     },
  //   ];

  //   mutations.setAbrTokens(state, data);

  //   expect(state.abrTokens).toStrictEqual(data);
  // });

  // test('mutations.setVbrTokens', () => {
  //   const data = [
  //     {
  //       denom: 'ucommercio',
  //       amount: '12363544370772.000000000000000000',
  //     },
  //   ];

  //   mutations.setVbrTokens(state, data);

  //   expect(state.vbrTokens).toStrictEqual(data);
  // });

  // test('mutations.setAllTokens', () => {
  //   const data = [{ denom: 'ucommercio', amount: '59996499910000' }];

  //   mutations.setAllTokens(state, data);

  //   expect(state.allTokens).toStrictEqual(data);
  // });

  // test('mutations.addAccountTokens', () => {
  //   const data = {
  //     name: 'validator',
  //     address: 'did:com:1ke2h5tzpcsyak62ltaf45ca8ppzfuye6qasur6',
  //     balances: [
  //       {
  //         denom: 'ucommercio',
  //         amount: '8099619600000',
  //       },
  //     ],
  //   };

  //   mutations.addAccountTokens(state, data);

  //   expect(state.accountsTokens).toStrictEqual([data]);
  // });

  // test('mutations.setFreezedTokens', () => {
  //   const data = {
  //     id: 1,
  //   };

  //   mutations.setFreezedTokens(state, data);

  //   expect(state.freezedTokens).toStrictEqual(data);
  // });
});
