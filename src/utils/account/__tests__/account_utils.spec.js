import { mockDelegations } from '../../../store/account/__mocks__/delegations';
import { mockRewards } from '../../../store/account/__mocks__/rewards';
import { mockBalances } from '../../../store/account/__mocks__/balances';
import { mockUnbondings } from '../../../store/account/__mocks__/unbondings';
import { mockValidators } from '../../../store/validators/__mocks__/validators';
import { mockValidatorDelegations } from '../../../store/validators/__mocks__/validator_delegations';
import AccountDelegationsHandler from '../AccountDelegationsHandler';
import AccountBalanceHandler from '../AccountBalanceHandler';
import AccountUnbondingsHandler from '../AccountUnbondingsHandler';

describe('utils/account', () => {
  test("if 'AccountDelegationsHandler' class returns an array of wanted delegations", () => {
    const delegations = AccountDelegationsHandler.setDelegations(
      mockValidatorDelegations(),
    )
      .setValidators(mockValidators())
      .get();

    const expectedKeys = ['moniker', 'operator', 'amount'];

    for (const delegation of delegations) {
      expect(Object.keys(delegation)).toStrictEqual(expectedKeys);
    }
  });

  test("if 'AccountBalanceHandler' class returns the wanted balance", () => {
    const balanceHandler = new AccountBalanceHandler({
      delegations: mockDelegations(1),
      rewards: mockRewards(1),
      unbondings: mockUnbondings(1),
      balances: mockBalances(1),
      bondDenom: 'ucommercio',
    });
    const expectedBalance = {
      delegations: 100,
      unbondings: 100,
      rewards: 100,
      bank: 100,
      active: 100,
      passive: 300,
      total: 400
    };


    const balance = balanceHandler.build();

    expect(balance).toStrictEqual(expectedBalance);
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
