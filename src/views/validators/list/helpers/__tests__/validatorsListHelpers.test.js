import { VALIDATORS } from '@/constants';
import { mockPool, mockValidators } from '@/__mocks__';
import validatorsChartHelper from '../validatorsChartHelper';
import validatorsTableAdapter from '../validatorsTableAdapter';

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

  test('if "validatorsTableAdapter.build" method return an array of wanted validators', () => {
    const items = 5;
    const validators = mockValidators(items);
    const blocks = [];
    const coin = 'uccc';
    const pool = mockPool();
    const accountPrefix = 'did:com:';
    const bookmarks = ['address'];
    const filter = { status: VALIDATORS.FILTER.ACTIVE, query: '' };
    const validatorsRows = validatorsTableAdapter.build({
      validators,
      accountPrefix,
      blocks,
      coin,
      pool,
      bookmarks,
      filter,
    });

    const expectedKeys = [
      'rank',
      'active',
      'moniker',
      'logo',
      'operator',
      'account',
      'tokens',
      'commission',
      'votingPower',
      'cumulative',
      'attendance',
      'bookmark',
    ];

    expect(validatorsRows.length).toBe(items);
    for (const validator of validatorsRows) {
      expect(Object.keys(validator)).toStrictEqual(expectedKeys);
    }
  });
});
