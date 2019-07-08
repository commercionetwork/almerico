/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockBalances
} from "../__mocks__/balances";

describe("store/account/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.fetchBalances' set balances", async () => {
    const commit = jest.fn();

    await actions.fetchBalances({
      commit
    }, "address");

    expect(commit).toHaveBeenCalledWith("setBalances", mockResponse.data);
  });

  it("Check if 'actions.fetchBalances' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchBalances({
      commit
    }, "address");

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchBalances' has a request error", async () => {
    const commit = jest.fn();
    mockErrorRequest = true;

    await actions.fetchBalances({
      commit
    }, "address");

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchBalances' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchBalances({
      commit
    }, "address");

    expect(commit).toBeCalledWith("setServerReachability", false, {
      root: true
    });
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
          data: mockBalances()
        };
        resolve(mockResponse);
      }, 1);
    });
  }
}));
