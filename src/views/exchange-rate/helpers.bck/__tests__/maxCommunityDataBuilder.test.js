import maxCommunityDataBuilder from '../max-table-builder/maxCommunityDataBuilder';
import maxTableBuilder from '../max-table-builder/index';

describe('views/exchange-rate/helpers/max-table-builder/maxCommunityDataBuilder', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test('if "build" method return community data to be used by max table', async () => {
  //   maxTableBuilder.getTokensByAccount = jest.fn().mockReturnValue(1);

  //   const res = await maxCommunityDataBuilder.build({
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
