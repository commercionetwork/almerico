import circulatingSupply from '../overview/circulating-supply';

describe('views/exchange-rate/helpers/overview/circulatingSupply', () => {
  test('if "getTable" return table headers and rows, plus total', () => {
    const maxSupply = 2;
    const nonCirculatingSupply = 1;
    const translator = (msg) => msg;

    const expectedKeys = ['headers', 'rows', 'total'];

    const table = circulatingSupply.getTable({
      maxSupply,
      nonCirculatingSupply,
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
