import tokensChartHelper from '../tokensChartHelper';

describe('utils/tokensChartHelper', () => {
  test('if "getChartData" method return expected object', () => {
    const _build = jest.spyOn(tokensChartHelper, 'build');
    _build.mockReturnValue({
      bonded: { decimal: 1, percent: '25.00 %' },
      burned: { decimal: 1, percent: '25.00 %' },
      unreleasedRewards: { decimal: 1, percent: '25.00 %' },
      unbonded: { decimal: 1, percent: '25.00 %' },
    });

    const data = tokensChartHelper.getChartData({
      abrTokens: [{ id: 1 }],
      params: { id: 1 },
      pool: { id: 1 },
      tokens: [{ id: 1 }],
      vbrTokens: [{ id: 1 }],
    });

    expect(data).toHaveProperty('labels');
    expect(data.labels).toHaveLength(4);
    expect(data).toHaveProperty('datasets');
    expect(data.datasets).toHaveLength(1);
    expect(data.datasets[0]).toHaveProperty('data');
    expect(data.datasets[0]).toHaveProperty('backgroundColor');
    expect(data.datasets[0]).toHaveProperty('borderColor');
  });
});
