import mutations from "../mutations";
import {
  initialState
} from "../index";

describe("store/account/mutations", () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...initialState
    };
  });

  test("Check mutations.startLoading", () => {
    state.error = "error";

    mutations.startLoading(state);

    expect(state.error).toBeNull;
    expect(state.isLoading).toBe(true);
  });

  test("Check mutations.stopLoading", () => {
    state.isLoading = true;

    mutations.stopLoading(state);

    expect(state.isLoading).toBe(false);
  });

  test("Check mutations.setError", () => {
    const error = JSON.stringify({
      message: "mutation error",
      status: 400
    });

    mutations.setError(state, error);

    expect(state.error).toBe(error);
  });

  test("Check mutations.setBalances", () => {
    const balances = [{
      id: 1
    }];

    mutations.setBalances(state, balances);

    expect(state.balances).toStrictEqual(balances);
  });

  test("Check mutations.setDelegations", () => {
    const delegations = [{
      id: 1
    }];

    mutations.setDelegations(state, delegations);

    expect(state.delegations).toStrictEqual(delegations);
  });

  test("Check mutations.setUnbondings", () => {
    const unbondings = [{
      id: 1
    }];

    mutations.setUnbondings(state, unbondings);

    expect(state.unbondings).toStrictEqual(unbondings);
  });

  test("Check mutations.setMembership", () => {
    const membership = {
      id: 1
    };

    mutations.setMembership(state, membership);

    expect(state.membership).toStrictEqual(membership);
  });

  test("Check mutations.setRewards", () => {
    const rewards = {
      id: 1
    };

    mutations.setRewards(state, rewards);

    expect(state.rewards).toStrictEqual(rewards);
  });
});