import { numberIntlFormatter } from '@/utils';
import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';
import maxFundsDataBuilder from '../max-table-builder/maxFundsDataBuilder';

describe('views/exchange-rate/helpers/max-table-builder/maxFundsDataBuilder', () => {
  test('if "build" method return funds data to be used by max table', async () => {
    exchangeRateOverviewBuilder.getTokensByDenom = jest.fn().mockReturnValue(1);
    numberIntlFormatter.toDecimal = jest.fn().mockReturnValue('1');
    numberIntlFormatter.toPercent = jest.fn().mockReturnValue('1.00 %');

    const res = await maxFundsDataBuilder.build({
      vbrTokens: [{ id: 1 }],
      abrTokens: [{ id: 1 }],
      denom: 'denom',
    });

    expect(res.length).toBe(4);
    for (const it of res) {
      expect(it.label).toBeDefined();
      expect(it.quantity).toBeDefined();
      expect(it.percentage).toBeDefined();
      expect(it.type).toBeDefined();
    }
  });
});
