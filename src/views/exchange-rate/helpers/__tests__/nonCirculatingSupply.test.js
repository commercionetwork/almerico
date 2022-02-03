import nonCirculatingSupply from '../overview/nonCirculatingSupply';

describe('views/exchange-rate/helpers/overview/nonCirculatingSupply', () => {
  test('if "getTable" return table headers and rows, plus total value', () => {
    const abrTokens = [{ denom: 'ucommercio', amount: '1' }];
    const bondedTokens = '1';
    const freezedTokens = [{ denom: 'ucommercio', amount: '1' }];
    const maxSupply = 2;
    const supply = [{ denom: 'ucommercio', amount: '1' }];
    const vbrTokens = [{ denom: 'ucommercio', amount: '1' }];
    const denom = 'ucommercio';
    const translator = (msg) => msg;

    const expectedKeys = ['headers', 'rows', 'total'];

    const table = nonCirculatingSupply.getTable({
      abrTokens,
      bondedTokens,
      freezedTokens,
      maxSupply,
      supply,
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
