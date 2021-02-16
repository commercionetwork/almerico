import { mockDelegations } from '../../../store/account/__mocks__/delegations';
import { mockRewards } from '../../../store/account/__mocks__/rewards';
import { mockUnbondings } from '../../../store/account/__mocks__/unbondings';
import { mockValidators } from '../../../store/validators/__mocks__/validators';
import { mockValidatorDelegations } from '../../../store/validators/__mocks__/validator_delegations';
import AccountDelegationsHandler from '../AccountDelegationsHandler';
import AccountStakeHandler from '../AccountStakeHandler';
import AccountUnbondingsHandler from '../AccountUnbondingsHandler';

describe('utils/account', () => {
  test("if 'AccountDelegationsHandler' class returns an array of wanted delegations", () => {
    const delegations = AccountDelegationsHandler.setDelegations(
      mockValidatorDelegations()
    )
      .setValidators(mockValidators())
      .get();

    const expectedKeys = ['moniker', 'operator', 'amount'];

    for (const delegation of delegations) {
      expect(Object.keys(delegation)).toStrictEqual(expectedKeys);
    }
  });

  test("if 'AccountStakeHandler' class returns the wanted stake", () => {
    const stake = AccountStakeHandler.setDelegations(mockDelegations())
      .setRewards(mockRewards())
      .setUnbondings(mockUnbondings())
      .get();

    const expectedStake = {
      delegations: 500,
      unbondings: 500,
      rewards: 100.9,
      total: 1100.9,
    };

    expect(stake).toStrictEqual(expectedStake);
  });

  test("if 'AccountUnbondingsHandler' class returns an array of wanted unbondings delegations", () => {
    const unbondings = AccountUnbondingsHandler.setUnbondings(mockUnbondings())
      .setValidators(mockValidators())
      .get();

    const expectedKeys = ['date', 'moniker', 'height', 'amount'];

    for (const unbonding of unbondings) {
      expect(Object.keys(unbonding)).toStrictEqual(expectedKeys);
    }
  });
});
