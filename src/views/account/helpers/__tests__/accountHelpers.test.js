import {
  mockBalances,
  mockDelegations,
  mockRewards,
  mockUnbondings,
  mockValidators,
} from '@/__mocks__';
import accountBalanceHelper from '../accountBalanceHelper';
import accountCapitalizationChartHelper from '../accountCapitalizationChartHelper';
import accountDelegationsHelper from '../accountDelegationsHelper';
import accountPerformanceChartHelper from '../accountPerformanceChartHelper';
import accountUnbondingsHelper from '../accountUnbondingsHelper';

describe('views/validators/account/helpers', () => {
  test('if "accountCapitalizationChartHelper.getChartData" method return expected object', () => {
    const mockCapitalization = {
      availables: 1,
      delegations: 1,
      unbondings: 1,
      rewards: 1,
      total: 4,
    };
    const mockLabels = {
      delegations: 'delegations',
      rewards: 'rewards',
      unbondings: 'unbondings',
      availables: 'availables',
    };
    const data = accountCapitalizationChartHelper.getChartData(
      mockCapitalization,
      mockLabels,
    );

    expect(data).toHaveProperty('labels');
    expect(data.labels).toHaveLength(4);
    expect(data).toHaveProperty('datasets');
    expect(data.datasets).toHaveLength(1);
    expect(data.datasets[0]).toHaveProperty('data');
    expect(data.datasets[0]).toHaveProperty('backgroundColor');
    expect(data.datasets[0]).toHaveProperty('borderColor');
    expect(data.datasets[0]).toHaveProperty('borderWidth');
  });

  test('if "accountPerformanceChartHelper.getChartData" method return expected object', () => {
    const mockAssets = {
      earning: 1,
      notEarning: 1,
      total: 2,
    };
    const mockLabels = { earning: 'earning', notEarning: 'notEarning' };
    const data = accountPerformanceChartHelper.getChartData(
      mockAssets,
      mockLabels,
    );

    expect(data).toHaveProperty('labels');
    expect(data.labels).toHaveLength(2);
    expect(data).toHaveProperty('datasets');
    expect(data.datasets).toHaveLength(1);
    expect(data.datasets[0]).toHaveProperty('data');
    expect(data.datasets[0]).toHaveProperty('backgroundColor');
    expect(data.datasets[0]).toHaveProperty('borderColor');
  });

  test('if "accountBalanceHelper.build" method return the wanted capital', () => {
    const capital = accountBalanceHelper.build({
      balances: mockBalances(),
      delegations: mockDelegations(),
      rewards: mockRewards(),
      unbondings: mockUnbondings(),
      bondDenom: 'ucommercio',
    });

    const expectedKeys = ['availables', 'delegations', 'rewards', 'unbondings'];
    expect(Object.keys(capital)).toStrictEqual(expectedKeys);
    expect(capital.earning).toEqual(capital.delegations);
    expect(capital.notEarning).toEqual(
      capital.availables + capital.rewards + capital.unbondings,
    );
    expect(capital.total).toEqual(
      capital.delegations +
        capital.availables +
        capital.rewards +
        capital.unbondings,
    );
    expect(capital.assets).toStrictEqual({
      earning: capital.earning,
      notEarning: capital.notEarning,
      total: capital.total,
    });
    expect(capital.capitalization).toStrictEqual({
      availables: capital.availables,
      delegations: capital.delegations,
      unbondings: capital.unbondings,
      rewards: capital.rewards,
      total: capital.total,
    });
  });

  test('if "accountDelegationsHelper.build" method return an array of wanted delegations', () => {
    const delegations = accountDelegationsHelper.build({
      delegations: mockDelegations(),
      validators: mockValidators(),
    });

    const expectedKeys = ['moniker', 'operator', 'amount'];

    for (const delegation of delegations) {
      expect(Object.keys(delegation)).toStrictEqual(expectedKeys);
    }
  });

  test('if "accountUnbondingsHelper.build" method return an array of wanted unbondings delegations', () => {
    const unbondings = accountUnbondingsHelper.build({
      unbondings: mockUnbondings(),
      validators: mockValidators(),
    });

    const expectedKeys = ['date', 'moniker', 'height', 'amount'];

    for (const unbonding of unbondings) {
      expect(Object.keys(unbonding)).toStrictEqual(expectedKeys);
    }
  });
});
