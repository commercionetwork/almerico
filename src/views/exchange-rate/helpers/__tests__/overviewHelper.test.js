import overviewHelper from '../overviewHelper';

describe('views/exchange-rate/helpers/overviewHelper', () => {
  test('if "getOverview" method return the 3 tables plus the exchange rate', async () => {
    const abrTokens = [{ denom: 'ucommercio', amount: '1' }];
    const accounts = [
      {
        name: 'name',
        address: 'address',
        balances: [{ denom: 'ucommercio', amount: '1' }],
      },
    ];
    const freezedTokens = [{ denom: 'ucommercio', amount: '1' }];
    const pool = {
      bonded_tokens: '1',
      not_bonded_tokens: '1',
    };
    const supply = [{ denom: 'ucommercio', amount: '1' }];
    const vbrTokens = [{ denom: 'ucommercio', amount: '1' }];
    const denom = 'ucommercio';
    const translator = (msg) => msg;
    const ctx = 'context';

    const expectedKeys = [
      'maxSupplyTable',
      'nonCirculatingSupplyTable',
      'circulatingSupplyTable',
      'exchangeRate',
    ];

    const overview = await overviewHelper.getOverview({
      abrTokens,
      accounts,
      freezedTokens,
      pool,
      supply,
      vbrTokens,
      denom,
      translator,
      ctx,
    });

    const overviewKeys = Object.keys(overview);

    expect(overviewKeys.length).toBe(4);
    overviewKeys.forEach((key) => {
      const index = expectedKeys.findIndex((it) => it === key);
      expect(index).toBeGreaterThanOrEqual(0);
    });
  });
});
