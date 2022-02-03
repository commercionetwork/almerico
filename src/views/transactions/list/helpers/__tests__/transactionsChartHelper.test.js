import { mockTransactions } from '@/__mocks__';
import transactionsChartHelper from '../transactionsChartHelper';

describe('views/transactions/list/helpers/transactionsChartHelper', () => {
  test('if "getChartData" method return expected object', () => {
    const data = transactionsChartHelper.getChartData(mockTransactions(), {
      msgs: 'msgs',
      txs: 'txs',
    });

    expect(data).toHaveProperty('labels');
    expect(data.labels).toHaveLength(2);
    expect(data).toHaveProperty('datasets');
    expect(data.datasets).toHaveLength(1);
    expect(data.datasets[0]).toHaveProperty('data');
    expect(data.datasets[0]).toHaveProperty('backgroundColor');
    expect(data.datasets[0]).toHaveProperty('borderColor');
  });
});
