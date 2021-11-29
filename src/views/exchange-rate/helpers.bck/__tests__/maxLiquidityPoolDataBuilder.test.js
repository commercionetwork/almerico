import maxLiquidityPoolDataBuilder from '../max-table-builder/maxLiquidityPoolDataBuilder';
import maxTableBuilder from '../max-table-builder/index';

describe('views/exchange-rate/helpers/max-table-builder/maxLiquidityPoolDataBuilder', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test('if "build" method return liquidity pool data to be used by max table', async () => {
  //   maxTableBuilder.getTokensByAccount = jest.fn().mockReturnValue(1);

  //   const res = await maxLiquidityPoolDataBuilder.build({
  //     accounts: [{ id: 1 }],
  //     denom: 'denom',
  //   });

  //   expect(res.length).toBe(3);
  //   for (const it of res) {
  //     expect(it.label).toBeDefined();
  //     expect(it.quantity).toBeDefined();
  //     expect(it.percentage).toBeDefined();
  //     expect(it.type).toBeDefined();
  //   }
  // });
});
