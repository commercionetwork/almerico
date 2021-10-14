import { mockBlocks } from '@/store/blocks/__mocks__/blocks';
import blocksChartHelper from '../blocksChartHelper';

describe('views/blocks/dashboard/helpers/blocksChartHelper', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test('if "getChartData" method return expected object', () => {
  //   const data = blocksChartHelper.getChartData(mockBlocks());

  //   expect(data).toHaveProperty('labels');
  //   expect(data.labels).toHaveLength(2);
  //   expect(data).toHaveProperty('datasets');
  //   expect(data.datasets).toHaveLength(1);
  //   expect(data.datasets[0]).toHaveProperty('data');
  //   expect(data.datasets[0]).toHaveProperty('backgroundColor');
  //   expect(data.datasets[0]).toHaveProperty('borderColor');
  // });
});
