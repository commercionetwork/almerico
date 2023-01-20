import { VALIDATORS } from '@/constants';
import { mockValidatorsBackend } from '@/__mocks__';
import validatorsChartHelper from '../validatorsChartHelper';
import validatorsTableHelper from '../validatorsTableHelper';

describe('views/validators/list/helpers', () => {
  test('if "validatorsChartHelper.getChartData" method return expected object', () => {
    const data = validatorsChartHelper.getChartData(mockValidatorsBackend(), [
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
    const validators = mockValidatorsBackend(items);
    const bookmarks = ['address'];
    const filter = { status: VALIDATORS.FILTER.ACTIVE, query: '' };
    const validatorsRows = validatorsTableHelper.getItems({
      validators,
      bookmarks,
      filter,
    });

    const expectedKeys = [
      'id',
      'operator_address',
      'account',
      'pubkey',
      'active',
      'rank',
      'tokens',
      'commission',
      'moniker',
      'logo',
      'identity',
      'website',
      'details',
      'security_contact',
      'update_time',
      'power',
      'cumulative',
      'attendance',
      'createdAt',
      'updatedAt',
      'bookmark',
    ];

    expect(validatorsRows.length).toBe(items);
    for (const validator of validatorsRows) {
      expect(Object.keys(validator)).toStrictEqual(expectedKeys);
    }
  });
});
