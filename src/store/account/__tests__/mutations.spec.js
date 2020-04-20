/* global describe, beforeEach, it, expect */

import mutations from "../mutations";
import { initialState } from "../index";
import { mockBalances } from "../__mocks__/balances";
import { mockDelegations } from "../__mocks__/delegations";
import { mockMembership } from "../__mocks__/membership";
import { mockRewards, mockReward } from "../__mocks__/rewards";
import { mockUnbondings } from "../__mocks__/unbondings";

describe("store/account/mutations", () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...initialState
    };
  });

  it("Check mutations.startLoading", () => {
    state.message = "message";

    mutations.startLoading(state);

    expect(state.isFetching).toBeTruthy();
    expect(state.message).toBe("");
  });

  it("Check mutations.stopLoading", () => {
    state.isFetching = true;

    mutations.stopLoading(state);

    expect(state.isFetching).toBeFalsy();
  });

  it("Check mutations.setMessage", () => {
    const message = "mutations.setMessage error";

    mutations.setMessage(state, message);

    expect(state.message).toEqual(message);
  });

  it("Check mutations.setBalances", () => {
    const data = mockBalances();

    mutations.setBalances(state, data);

    expect(state.balances).toEqual(data);
  });

  it("Check mutations.setDelegations", () => {
    const data = mockDelegations();

    mutations.setDelegations(state, data);

    expect(state.delegations).toEqual(data);
  });

  it("Check mutations.setMembership", () => {
    const data = mockMembership();

    mutations.setMembership(state, data);

    expect(state.membership).toEqual(data.membership_type);
  });

  it("Check mutations.setRewards", () => {
    const data = mockRewards();

    mutations.setRewards(state, data);

    expect(state.rewards).toEqual(data);
  });

  it("Check mutations.setUnbondingDelegations", () => {
    const data = mockUnbondings();

    mutations.setUnbondingDelegations(state, data);

    expect(state.unbondingDelegations).toEqual(data);
  });
});