import { numberIntlFormatter } from '@/utils';
import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';
import nonCirculatingTableBuilder from '../non-circulating-table-builder/index';

describe('views/exchange-rate/helpers/non-circulating-table-builder', () => {
  test('if "build" method return data to be used by non circulating table', async () => {
    exchangeRateOverviewBuilder.getTokensByDenom = jest.fn().mockReturnValue(1);
    numberIntlFormatter.toDecimal = jest.fn().mockReturnValue('1');
    numberIntlFormatter.toPercent = jest.fn().mockReturnValue('1.00 %');

    const res = await nonCirculatingTableBuilder.build({
      abrTokens: [{ id: 1 }],
      vbrTokens: [{ id: 1 }],
      allTokens: [{ id: 1 }],
      freezedTokens: [{ id: 1 }],
      maxSupply: 1,
      bondedTokens: '1000000',
      denom: 'denom',
    });

    expect(res.tableData.length).toBe(7);
    expect(res.headers.length).toBe(3);
    expect(res.totalNonCirculatingSupply).toBeDefined();
  });
});
