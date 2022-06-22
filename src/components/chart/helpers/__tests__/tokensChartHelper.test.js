import { mockChart } from '@/__mocks__/';
import tokensChartHelper from '../tokensChartHelper';

describe('utils/tokensChartHelper', () => {
  test('if "getChartData" method return expected object', () => {
    const items = 5;
    const translator = jest.fn();
    const chart = mockChart(items);

    const data = tokensChartHelper.getChartData(translator, this, chart);

    expect(data).toHaveProperty('labels');
    expect(data.labels).toHaveLength(items);
    expect(data).toHaveProperty('datasets');
    expect(data.datasets).toHaveLength(1);
    expect(data.datasets[0]).toHaveProperty('data');
    expect(data.datasets[0]).toHaveProperty('backgroundColor');
    expect(data.datasets[0]).toHaveProperty('borderColor');
  });
});
