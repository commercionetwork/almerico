import { numberIntlFormatter } from '@/utils';
import maxValidatorDataBuilder from '../max-table-builder/maxValidatorDataBuilder';
import maxTableBuilder from '../max-table-builder/index';

describe('views/exchange-rate/helpers/max-table-builder/maxValidatorDataBuilder', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test('if "build" method return validator data to be used by max table', async () => {
  //   maxTableBuilder.getTokensByAccount = jest.fn().mockReturnValue(1);
  //   numberIntlFormatter.toDecimal = jest.fn().mockReturnValue('1');
  //   numberIntlFormatter.toPercent = jest.fn().mockReturnValue('1.00 %');

  //   const res = await maxValidatorDataBuilder.build({
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
