import ExchangeRateTableBuilder, {
  getHeaders,
  getTokensByDenom,
} from '../ExchangeRateTableBuilder';

describe('views/exchange-rate/helpers/ExchangeRateTableBuilder.js', () => {
  test('if "build" method returns an object well formed', async () => {
    const accounts = [
      {
        name: 'name',
        address: 'address',
        balances: [{ denom: 'ucommercio', amount: '1' }],
      },
    ];
    const abrTokens = [{ denom: 'ucommercio', amount: '1' }];
    const allTokens = [{ denom: 'ucommercio', amount: '1' }];
    const vbrTokens = [{ denom: 'ucommercio', amount: '1' }];
    const bondedTokens = '3969443110001';
    const denom = 'ucommercio';

    const expectedValue = {
      totalData: [{ id: 1 }],
      totalHeaders: [{ id: 1 }],
      nonCirculatingData: [{ id: 1 }],
      nonCirculatingHeaders: [{ id: 1 }],
      circulatingData: [{ id: 1 }],
      circulatingHeaders: [{ id: 1 }],
      exchangeRate: '1,00',
    };

    const res = await ExchangeRateTableBuilder.build({
      accounts,
      abrTokens,
      allTokens,
      vbrTokens,
      bondedTokens,
      denom,
    });
    expect(res).toStrictEqual(expectedValue);
  });

  test('if "getHeaders" add custom header to the beginning of default headers array', () => {
    const header = {
      text: 'Max Supply',
      value: 'label',
      sortable: false,
      align: 'start',
    };

    const expectedValue = [
      header,
      {
        text: 'Quantity',
        value: 'quantity',
        sortable: false,
        align: 'end',
      },
      {
        text: 'Percentage',
        value: 'percentage',
        sortable: false,
        align: 'end',
      },
    ];

    const res = getHeaders(header);
    expect(res).toStrictEqual(expectedValue);
  });

  test('if "getTokensByDenom" returns the right amount of tokens', () => {
    const balances = [
      { denom: 'ucommercio', amount: 1 },
      { denom: 'uccc', amount: 1 },
    ];
    const denom = 'ucommercio';

    const expectedValue = 1 / 1000000;

    const res = getTokensByDenom({ balances, denom });

    expect(res).toBe(expectedValue);
  });
});

jest.mock('./../ExchangeRateTableTotalBuilder.js', () => ({
  build: () => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            tableData: [{ id: 1 }],
            headers: [{ id: 1 }],
            liquidityPoolDistributed: 1,
            totalSupply: 1,
          }),
        1,
      );
    });
  },
}));

jest.mock('./../ExchangeRateTableNonCirculatingBuilder.js', () => ({
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

jest.mock('./../ExchangeRateTableCirculatingBuilder.js', () => ({
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
