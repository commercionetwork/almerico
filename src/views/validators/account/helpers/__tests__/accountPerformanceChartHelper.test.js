import accountPerformanceChartHelper from '../accountPerformanceChartHelper';

describe('views/validators/account/helpers/accountPerformanceChartHelper', () => {
  const mockAssets = {
    earning: 1,
    notEarning: 1,
    total: 2,
  };

  test('if "getChartData" method return expected object', () => {
    const data = accountPerformanceChartHelper.getChartData(mockAssets);

    expect(data).toHaveProperty('labels');
    expect(data.labels).toHaveLength(2);
    expect(data).toHaveProperty('datasets');
    expect(data.datasets).toHaveLength(1);
    expect(data.datasets[0]).toHaveProperty('data');
    expect(data.datasets[0]).toHaveProperty('backgroundColor');
    expect(data.datasets[0]).toHaveProperty('borderColor');
  });
});
