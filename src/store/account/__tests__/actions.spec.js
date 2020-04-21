/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import { mockBalances } from "../__mocks__/balances";
import { mockDelegations } from "../__mocks__/delegations";
import { mockMembership } from "../__mocks__/membership";
import { mockRewards } from "../__mocks__/rewards";
import { mockUnbondings } from "../__mocks__/unbondings";

describe("store/account/actions", () => {
  it("Check if 'actions.fetchBalances' set balances", async () => {
    const commit = jest.fn();

    await actions.fetchBalances({
      commit
    }, "address");

    expect(commit).toHaveBeenCalledWith("setBalances", mockResponse.data.result);
  });

  it("Check if 'actions.fetchDelegations' set delegations", async () => {
    const commit = jest.fn();

    await actions.fetchDelegations({
      commit
    }, "address");

    expect(commit).toHaveBeenCalledWith("setDelegations", mockResponse.data.result);
  });

  it("Check if 'actions.fetchMembership' set membership", async () => {
    const commit = jest.fn();

    await actions.fetchMembership({
      commit
    }, "address");

    expect(commit).toHaveBeenCalledWith("setMembership", mockResponse.data.result);
  });

  it("Check if 'actions.fetchRewards' set rewards", async () => {
    const commit = jest.fn();

    await actions.fetchRewards({
      commit
    }, "address");

    expect(commit).toHaveBeenCalledWith("setRewards", mockResponse.data.result);
  });

  it("Check if 'actions.fetchUnbondingDelegations' set unbonding delegations", async () => {
    const commit = jest.fn();

    await actions.fetchUnbondingDelegations({
      commit
    }, "address");

    expect(commit).toHaveBeenCalledWith("setUnbondingDelegations", mockResponse.data.result);
  });

  it("Check if 'actions.fetchAccount' dispatch fetchMembership, fetchBalances, fetchDelegations, fetchRewards, fetchUnbondingDelegations", () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = "address";

    actions.fetchAccount({
      commit, dispatch
    }, address);

    expect(dispatch).toHaveBeenCalledWith("fetchMembership", address);
    expect(dispatch).toHaveBeenCalledWith("fetchBalances", address);
    expect(dispatch).toHaveBeenCalledWith("fetchDelegations", address);
    expect(dispatch).toHaveBeenCalledWith("fetchRewards", address);
    expect(dispatch).toHaveBeenCalledWith("fetchUnbondingDelegations", address);
  });
});

let mockResponse = null;

let mockError = false;
const mockErrorResponse = {
  request: {},
  response: {
    data: {
      error: "error",
    },
    status: 400
  }
};
let mockErrorRequest = false;
const mockErrorRequestResponse = {
  request: {},
  response: undefined
};
let mockErrorServer = false;

jest.mock("./../api", () => ({
  requestBalances: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: "1",
            result: mockBalances()
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestDelegations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: "2",
            result: mockDelegations()
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestMembership: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: "0",
            result: mockMembership()
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestRewards: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: "3",
            result: mockRewards()
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestUnbondingDelegations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: "4",
            result: mockUnbondings()
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
