import { mockValidator, mockDelegation } from '@/__mocks__';
import validatorsDetailChartHelper from '../validatorsDetailChartHelper';
import validatorsDetailDelegationsHelper from '../validatorsDetailDelegationsHelper';
import validatorsDetailDelegatorsHelper from '../validatorsDetailDelegatorsHelper';

describe('views/validators/detail/helpers', () => {
  const mockAccount = 'did:com:154xssuad424hc076aygm9y77nfjj70sra68e4r';
  const mockDetail = mockValidator();
  const mockDelegations = [
    mockDelegation(),
    mockDelegation(
      'did:com:1yq5z4236gmcuus2t940spppwzz8uggpj5ty7ha',
      'did:com:valoper1yq5z4236gmcuus2t940spppwzz8uggpjhgac6w',
    ),
  ];

  test('if "validatorsDetailDelegatorsHelper.build" method return aggregate delegators', () => {
    const delegators = validatorsDetailDelegatorsHelper.build({
      account: mockAccount,
      detail: mockDetail,
      delegations: mockDelegations,
    });

    const expectedKeys = ['delegator', 'amount', 'share'];
    for (const delegator of delegators) {
      expect(Object.keys(delegator)).toStrictEqual(expectedKeys);
    }

    const addresses = delegators.map((item) => item.delegator);
    const isDuplicate = addresses.some(
      (item, idx) => addresses.indexOf(item) != idx,
    );
    expect(isDuplicate).toBe(false);
  });

  test('if "validatorsDetailDelegationsHelper.build" method return the delegations total amounts', () => {
    const expectedDelegations = { self: 100000000, others: 100000000 };
    const expectTotal = expectedDelegations.self + expectedDelegations.others;

    const delegations = validatorsDetailDelegationsHelper.build(
      mockDelegations,
      mockAccount,
    );

    expect(delegations.self).toBe(expectedDelegations.self);
    expect(delegations.others).toBe(expectedDelegations.others);
    expect(delegations.total).toBe(expectTotal);
  });

  test('if "validatorsDetailChartHelper.getChartData" method return expected object', () => {
    const delegations = validatorsDetailDelegationsHelper.build(
      mockDelegations,
      mockAccount,
    );
    const data = validatorsDetailChartHelper.getChartData(delegations, {
      others: 'others',
      self: 'self',
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
