import maxSupply from '../overview/maxSupply';

describe('views/exchange-rate/helpers/overview/maxSupply', () => {
  test('if "getTable" return table headers and rows, plus total value', () => {
    const abrTokens = [{ denom: 'ucommercio', amount: '1' }];
    const accounts = [
      {
        name: 'name',
        address: 'address',
        balances: [{ denom: 'ucommercio', amount: '1' }],
      },
    ];
    const vbrTokens = [{ denom: 'ucommercio', amount: '1' }];
    const denom = 'ucommercio';
    const translator = (msg) => msg;

    const expectedKeys = ['headers', 'rows', 'total'];

    const table = maxSupply.getTable({
      accounts,
      abrTokens,
      vbrTokens,
      denom,
      translator,
    });

    const tableKeys = Object.keys(table);

    expect(tableKeys.length).toBe(3);
    tableKeys.forEach((key) => {
      const index = expectedKeys.findIndex((it) => it === key);
      expect(index).toBeGreaterThanOrEqual(0);
    });
  });
});
