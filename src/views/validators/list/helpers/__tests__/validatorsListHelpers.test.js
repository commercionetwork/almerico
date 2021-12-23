import { mockPool, mockValidators, mockValidatorSets } from '@/__mocks__';
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
    const status = true;
    const blocks = [];
    const coin = 'uccc';
    const pool = mockPool();
    const accountPrefix = 'did:com:';
    const bookmarks = ['address'];
    const convertedValidators = validatorsTableAdapter.build({
      validators,
      status,
      accountPrefix,
      blocks,
      coin,
      pool,
      bookmarks,
    });

    const expectedKeys = [
      'rank',
      'active',
      'moniker',
      'operator',
      'account',
      'tokens',
      'commission',
      'votingPower',
      'cumulative',
      'attendance',
      'bookmark',
    ];

    expect(convertedValidators.length).toBe(items);
    for (const validator of convertedValidators) {
      expect(Object.keys(validator)).toStrictEqual(expectedKeys);
    }
  });
});
