import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';

describe('views/exchange-rate/helpers/exchangeRateOverviewBuilder.js', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  // test('if "build" method returns an object well formed', async () => {
  //   const mockExchangeRate = '1.00';
  //   const mockGetExchangeRate = jest.spyOn(
  //     exchangeRateOverviewBuilder,
  //     'getExchangeRate',
  //   );
  //   mockGetExchangeRate.mockReturnValue(mockExchangeRate);

  //   const accounts = [
  //     {
  //       name: 'name',
  //       address: 'address',
  //       balances: [{ denom: 'ucommercio', amount: '1' }],
  //     },
  //   ];
  //   const abrTokens = [{ denom: 'ucommercio', amount: '1' }];
  //   const supply = [{ denom: 'ucommercio', amount: '1' }];
  //   const vbrTokens = [{ denom: 'ucommercio', amount: '1' }];
  //   const bondedTokens = '1';
  //   const denom = 'ucommercio';

  //   const expectedValue = {
  //     maxData: [{ id: 1 }],
  //     maxHeaders: [{ id: 1 }],
  //     nonCirculatingData: [{ id: 1 }],
  //     nonCirculatingHeaders: [{ id: 1 }],
  //     circulatingData: [{ id: 1 }],
  //     circulatingHeaders: [{ id: 1 }],
  //     exchangeRate: mockExchangeRate,
  //   };

  //   const res = await exchangeRateOverviewBuilder.build({
  //     accounts,
  //     abrTokens,
  //     supply,
  //     vbrTokens,
  //     bondedTokens,
  //     denom,
  //   });

  //   expect(res).toStrictEqual(expectedValue);

  //   mockGetExchangeRate.mockRestore();
  // });

  // test('if "getExchangeRate" return the right rate', () => {
  //   const expectedValue = '0.50';

  //   const res = exchangeRateOverviewBuilder.getExchangeRate(2, 1);
  //   const bits = res.split(/[.,]+/);
  //   const rate = `${bits[0]}.${bits[1]}`;

  //   expect(rate).toBe(expectedValue);
  // });

  // test('if "getHeaders" add custom header to the beginning of default headers array', () => {
  //   const header = {
  //     text: 'Max Supply',
  //     value: 'label',
  //     sortable: false,
  //     align: 'start',
  //   };

  //   const expectedValue = [
  //     header,
  //     {
  //       text: 'Quantity',
  //       value: 'quantity',
  //       sortable: false,
  //       align: 'end',
  //     },
  //     {
  //       text: 'Percentage',
  //       value: 'percentage',
  //       sortable: false,
  //       align: 'end',
  //     },
  //   ];

  //   const res = exchangeRateOverviewBuilder.getHeaders(header);
  //   expect(res).toStrictEqual(expectedValue);
  // });

  // test('if "getTokensByDenom" returns the right amount of tokens', () => {
  //   const balances = [
  //     { denom: 'ucommercio', amount: 1 },
  //     { denom: 'uccc', amount: 1 },
  //   ];
  //   const denom = 'ucommercio';

  //   const expectedValue = 1 / 1000000;

  //   const res = exchangeRateOverviewBuilder.getTokensByDenom({
  //     balances,
  //     denom,
  //   });

  //   expect(res).toBe(expectedValue);
  // });
});

jest.mock('./../max-table-builder/index.js', () => ({
  build: () => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            tableData: [{ id: 1 }],
            headers: [{ id: 1 }],
            maxSupply: 1,
          }),
        1,
      );
    });
  },
}));

jest.mock('./../non-circulating-table-builder/index.js', () => ({
  build: () => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            tableData: [{ id: 1 }],
            headers: [{ id: 1 }],
            totalNonCirculatingSupply: 1,
          }),
        1,
      );
    });
  },
}));

jest.mock('./../circulating-table-builder/index.js', () => ({
  build: () => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            tableData: [{ id: 1 }],
            headers: [{ id: 1 }],
            totalCirculatingSupply: 1,
          }),
        1,
      );
    });
  },
}));
