import tokensChartHelper from '../tokensChartHelper';

describe('utils/tokensChartHelper', () => {
  test('if "getChartData" method return expected object', () => {
    const _build = jest.spyOn(tokensChartHelper, 'build');
    _build.mockReturnValue({
      bonded: { decimal: 1, percent: '20.00 %' },
      burned: { decimal: 1, percent: '20.00 %' },
      freezed: { decimal: 1, percent: '20.00 %' },
      unreleasedRewards: { decimal: 1, percent: '20.00 %' },
      unbonded: { decimal: 1, percent: '20.00 %' },
    });
    const labels = {
      bonded: 'bonded',
      burned: 'burned',
      freezed: 'freezed',
      notBonded: 'notBonded',
      unreleasedRewards: 'unreleasedRewards',
    };
    const data = tokensChartHelper.getChartData({
      abrTokens: [{ id: 1 }],
      freezedTokens: [{ id: 1 }],
      params: { id: 1 },
      pool: { id: 1 },
      tokens: [{ id: 1 }],
      vbrTokens: [{ id: 1 }],
      labels,
    });

    expect(data).toHaveProperty('labels');
    expect(data.labels).toHaveLength(5);
    expect(data).toHaveProperty('datasets');
    expect(data.datasets).toHaveLength(1);
    expect(data.datasets[0]).toHaveProperty('data');
    expect(data.datasets[0]).toHaveProperty('backgroundColor');
    expect(data.datasets[0]).toHaveProperty('borderColor');
  });
});
