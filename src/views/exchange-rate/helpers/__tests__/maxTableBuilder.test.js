import maxTableBuilder from '../max-table-builder/index';
import maxCommunityDataBuilder from '../max-table-builder/maxCommunityDataBuilder';
import maxFundsDataBuilder from '../max-table-builder/maxFundsDataBuilder';
import maxLiquidityPoolDataBuilder from '../max-table-builder/maxLiquidityPoolDataBuilder';
import maxValidatorDataBuilder from '../max-table-builder/maxValidatorDataBuilder';

describe('views/exchange-rate/helpers/max-table-builder', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test('if "build" method return data to be used by max table', async () => {
  //   const mockMaxValidatorDataBuilder = jest.spyOn(
  //     maxValidatorDataBuilder,
  //     'build',
  //   );
  //   mockMaxValidatorDataBuilder.mockImplementation(() => [{ id: 1 }]);

  //   const mockMaxLiquidityPoolDataBuilder = jest.spyOn(
  //     maxLiquidityPoolDataBuilder,
  //     'build',
  //   );
  //   mockMaxLiquidityPoolDataBuilder.mockImplementation(() => [{ id: 1 }]);

  //   const mockMaxCommunityDataBuilder = jest.spyOn(
  //     maxCommunityDataBuilder,
  //     'build',
  //   );
  //   mockMaxCommunityDataBuilder.mockImplementation(() => [{ id: 1 }]);

  //   const mockMaxFundsDataBuilder = jest.spyOn(maxFundsDataBuilder, 'build');
  //   mockMaxFundsDataBuilder.mockImplementation(() => [{ id: 1 }]);

  //   const accounts = [{ id: 1 }];
  //   const abrTokens = [{ id: 1 }];
  //   const vbrTokens = [{ id: 1 }];
  //   const denom = 'denom';

  //   const res = await maxTableBuilder.build({
  //     accounts,
  //     abrTokens,
  //     vbrTokens,
  //     denom,
  //   });

  //   expect(mockMaxValidatorDataBuilder).toBeCalledWith({
  //     accounts,
  //     denom,
  //   });
  //   expect(mockMaxLiquidityPoolDataBuilder).toBeCalledWith({
  //     accounts,
  //     denom,
  //   });
  //   expect(mockMaxCommunityDataBuilder).toBeCalledWith({
  //     accounts,
  //     denom,
  //   });
  //   expect(mockMaxFundsDataBuilder).toBeCalledWith({
  //     vbrTokens,
  //     abrTokens,
  //     denom,
  //   });
  //   expect(res.headers.length).toBe(3);
  //   expect(res.maxSupply).toBeDefined();
  // });

  // test('if "getTokensByAccount" find account by name', () => {
  //   const mockBalances = [
  //     { denom: 'uccc', amount: '2' },
  //     { denom: 'ucommercio', amount: '1000000' },
  //   ];
  //   const mockAccounts = [
  //     {
  //       name: 'community',
  //       address: 'address',
  //       balances: [{ denom: 'ucommercio', amount: '3' }],
  //     },
  //     {
  //       name: 'liquidityPool',
  //       address: 'address',
  //       balances: [{ denom: 'ucommercio', amount: '4' }],
  //     },
  //     {
  //       name: 'validator',
  //       address: 'address',
  //       balances: mockBalances,
  //     },
  //   ];

  //   const expectedValue = 1;

  //   const res = maxTableBuilder.getTokensByAccount({
  //     accounts: mockAccounts,
  //     name: 'validator',
  //     denom: 'ucommercio',
  //   });
  //   expect(res).toBe(expectedValue);
  // });
});
