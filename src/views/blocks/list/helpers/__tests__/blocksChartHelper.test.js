import { mockBlocks } from '@/__mocks__';
import blocksChartHelper from '../blocksChartHelper';

describe('views/blocks/list/helpers/blocksChartHelper', () => {
  test('if "getChartData" method return expected object', () => {
    const data = blocksChartHelper.getChartData(mockBlocks(), {
      blocks: 'blocks',
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
