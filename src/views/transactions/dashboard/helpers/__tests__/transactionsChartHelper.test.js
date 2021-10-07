import { mockTxs } from '@/store/transactions/__mocks__/txs';
import transactionsChartHelper from '../transactionsChartHelper';

describe('views/transactions/dashboard/helpers/transactionsChartHelper', () => {
  test('if "getChartData" method return expected object', () => {
    const data = transactionsChartHelper.getChartData(mockTxs());

    expect(data).toHaveProperty('labels');
    expect(data.labels).toHaveLength(2);
    expect(data).toHaveProperty('datasets');
    expect(data.datasets).toHaveLength(1);
    expect(data.datasets[0]).toHaveProperty('data');
    expect(data.datasets[0]).toHaveProperty('backgroundColor');
    expect(data.datasets[0]).toHaveProperty('borderColor');
  });
});
