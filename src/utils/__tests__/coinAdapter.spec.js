import { coinAdapter } from '../index';

describe('utils/coinAdapter', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test('if function "convertItem" returns the converted coin', () => {
  //   const balance = {
  //     denom: 'ucommercio',
  //     amount: 123456000000,
  //   };
  //   const expectedValue = { amount: '123456000000', denom: 'com' };

  //   const convertedCoin = coinAdapter.convertItem(balance);

  //   expect(convertedCoin.amount.replace(/[,.]/g, '')).toEqual(
  //     expectedValue.amount,
  //   );
  //   expect(convertedCoin.denom).toEqual(expectedValue.denom);
  // });

  // test('if function "convertItem" returns the not converted coin', () => {
  //   const balance = {
  //     denom: 'commercio',
  //     amount: '123456.000000',
  //   };
  //   const expectedValue = { amount: '123456', denom: 'commercio' };

  //   const convertedCoin = coinAdapter.convertItem(balance);

  //   expect(convertedCoin.amount.replace(/[,.]/g, '')).toEqual(
  //     expectedValue.amount,
  //   );
  //   expect(convertedCoin.denom).toEqual(expectedValue.denom);
  // });

  // test('if function "convertList" returns the converted coins', () => {
  //   const balances = [
  //     {
  //       denom: 'ucommercio',
  //       amount: 123456000000,
  //     },
  //   ];
  //   const expectedValue = [{ amount: '123456000000', denom: 'com' }];

  //   const convertedCoins = coinAdapter.convertList(balances);

  //   convertedCoins.forEach((convertedCoin, i) => {
  //     expect(convertedCoin.amount.replace(/[,.]/g, '')).toEqual(
  //       expectedValue[i].amount,
  //     );
  //     expect(convertedCoin.denom).toEqual(expectedValue[i].denom);
  //   });
  // });

  // test('if function "format" returns the converted coin and denom joined', () => {
  //   const balance = {
  //     denom: 'ucommercio',
  //     amount: 123456000000,
  //   };
  //   const expectedValue = '123456000000 com';

  //   const convertedCoin = coinAdapter.format(balance);

  //   expect(convertedCoin.replace(/[,.]/g, '')).toBe(expectedValue);
  // });

  // test('if function "format" returns the not converted coin and denom joined', () => {
  //   const balance = {
  //     denom: 'commercio',
  //     amount: '123456.000000',
  //   };
  //   const expectedValue = '123456 commercio';

  //   const convertedCoin = coinAdapter.format(balance);

  //   expect(convertedCoin.replace(/[,.]/g, '')).toBe(expectedValue);
  // });

  // test('if function "format" returns undefined when argument is bad', () => {
  //   let balance = {
  //     denom: 'ucommercio',
  //   };

  //   let convertedCoin = coinAdapter.format(balance);

  //   expect(convertedCoin).toBe(undefined);

  //   balance = {
  //     amount: '123456000000',
  //   };

  //   convertedCoin = coinAdapter.format(balance);

  //   expect(convertedCoin).toBe(undefined);
  // });
});
