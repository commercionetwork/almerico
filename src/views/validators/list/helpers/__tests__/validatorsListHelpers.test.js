import { VALIDATORS } from '@/constants';
import { mockBlocks, mockPool, mockValidators } from '@/__mocks__';
import validatorsChartHelper from '../validatorsChartHelper';
import validatorsTableHelper from '../validatorsTableHelper';

describe('views/validators/list/helpers', () => {
  test('if "validatorsChartHelper.getChartData" method return expected object', () => {
    const data = validatorsChartHelper.getChartData(mockValidators(), [
      'label1',
      'label2',
    ]);

    expect(data).toHaveProperty('labels');
    expect(data.labels).toHaveLength(2);
    expect(data).toHaveProperty('datasets');
    expect(data.datasets).toHaveLength(1);
    expect(data.datasets[0]).toHaveProperty('data');
    expect(data.datasets[0]).toHaveProperty('backgroundColor');
    expect(data.datasets[0]).toHaveProperty('borderColor');
  });

  test('if "validatorsTableHelper.getItems" method return an array of wanted validators', () => {
    const items = 5;
    const validators = mockValidators(items);
    const pool = mockPool();
    const bookmarks = ['address'];
    const blocks = mockBlocks();
    const isLoading = false;
    const filter = { status: VALIDATORS.FILTER.ACTIVE, query: '' };
    const validatorsRows = validatorsTableHelper.getItems({
      validators,
      pool,
      bookmarks,
      blocks,
      isLoading,
      filter,
    });

    const expectedKeys = [
      'active',
      'rank',
      'bookmark',
      'logo',
      'moniker',
      'operator',
      'tokens',
      'commission',
      'account',
      'votingPower',
      'cumulative',
      'attendance',
    ];

    expect(validatorsRows.length).toBe(items);
    for (const validator of validatorsRows) {
      expect(Object.keys(validator)).toStrictEqual(expectedKeys);
    }
  });
});
