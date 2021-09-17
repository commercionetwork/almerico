import tokensChartBuilder from '../tokensChartBuilder';
import { numberIntlFormatter } from '@/utils';

describe('views/dashboard/helpers/tokensChartBuilder', () => {
  test('if "build" method return expected object', async () => {
    const mockDecimals = {
      bonded: 1,
      burned: 1,
      unbonded: 1,
      unreleasedRewards: 1,
    };
    tokensChartBuilder.getDecimal = jest.fn().mockReturnValue(mockDecimals);
    const mockMaxSupply = '1';
    numberIntlFormatter.toDecimal = jest.fn().mockReturnValue(mockMaxSupply);
    const mockPercent = '1.00%';
    tokensChartBuilder.getPercent = jest.fn().mockReturnValue(mockPercent);

    const expectedValue = {
      all: {
        label: mockMaxSupply,
      },
      bonded: {
        decimal: 1,
        percent: mockPercent,
      },
      burned: {
        decimal: 1,
        percent: mockPercent,
      },
      unbonded: {
        decimal: 1,
        percent: mockPercent,
      },
      unreleasedRewards: {
        decimal: 1,
        percent: mockPercent,
      },
    };

    const res = await tokensChartBuilder.build({
      abrTokens: [],
      params: {},
      pool: {},
      tokens: [],
      vbrTokens: [],
    });

    expect(res).toStrictEqual(expectedValue);
  });
});
