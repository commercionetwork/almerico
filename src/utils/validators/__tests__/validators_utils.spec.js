import { mockPool } from '../../../store/starting/__mocks__/pool';
import {
  mockValidator,
  mockValidators
} from '../../../store/validators/__mocks__/validators';
import { mockValidatorDelegations } from '../../../store/validators/__mocks__/validator_delegations';
import { mockValidatorSets } from '../../../store/validators/__mocks__/validator_sets';
import ValidatorDelegationsHandler from '../ValidatorDelegationsHandler';
import ValidatorDelegatorsAggregator from '../ValidatorDelegatorsAggregator';
import ValidatorsTableAdapter from '../ValidatorsTableAdapter';

describe('utils/validators', () => {
  test("if 'ValidatorDelegationsHandler' class returns the delegations total amounts", () => {
    const items = 5;
    const delegations = mockValidatorDelegations(items);
    const address = 'did:com:1yq5z4236gmcuus2t940spppwzz8uggpj5ty7ha';
    const tokens = ValidatorDelegationsHandler.setAddress(address)
      .setDelegations(delegations)
      .get();

    const expectedKeys = ['others', 'self', 'total'];

    expect(Object.keys(tokens)).toStrictEqual(expectedKeys);
    let total = 0;
    for (const delegation of delegations) {
      total += parseFloat(delegation['shares']);
    }
    expect(total).toBe(tokens.total);
  });

  test("if 'ValidatorDelegatorsAggregator' class returns aggregate delegators", () => {
    const validator = mockValidator();
    const address = 'did:com:1yq5z4236gmcuus2t940spppwzz8uggpj5ty7ha';
    const delegators = ValidatorDelegatorsAggregator.setAccount(address)
      .setValidator(validator)
      .get();

    const expectedKeys = ['delegator', 'amount', 'share'];

    for (const delegator of delegators) {
      expect(Object.keys(delegator)).toStrictEqual(expectedKeys);
    }

    const addresses = delegators.map((item) => item.delegator);
    const isDuplicate = addresses.some(
      (item, idx) => addresses.indexOf(item) != idx
    );
    expect(isDuplicate).toBe(false);
  });

  test("if 'ValidatorsTableAdapter' class returns an array of wanted validators", () => {
    const items = 5;
    const validators = mockValidators(items);
    const blocks = [];
    const coin = 'uccc';
    const pool = mockPool();
    const validatorSets = mockValidatorSets().validators;
    const convertedValidators = ValidatorsTableAdapter.setValidators(validators)
      .setBlocks(blocks)
      .setCoin(coin)
      .setPool(pool)
      .setValidatorsSet(validatorSets)
      .get();

    const expectedKeys = [
      'rank',
      'active',
      'moniker',
      'operator',
      'tokens',
      'commission',
      'votingPower',
      'cumulative',
      'attendance',
    ];

    expect(convertedValidators.length).toBe(items);
    for (const validator of convertedValidators) {
      expect(Object.keys(validator)).toStrictEqual(expectedKeys);
    }
  });
});
