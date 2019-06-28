/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockTransactions
} from "../__mocks__/transactions";

describe("store/transactions/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.fetchTransactions' updates transactions", async () => {
    const commit = jest.fn();

    await actions.fetchTransactions({
      commit
    });

    expect(commit).toHaveBeenCalledWith("addTransactions", mockResponse.data);
  });

  it("Check if 'actions.fetchTransactions' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchTransactions({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchTransactions' has a request error", async () => {
    const commit = jest.fn();
    mockErrorRequest = true;

    await actions.fetchTransactions({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchTransactions' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchTransactions({
      commit
    });

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
  requestTransactions: () => {
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
          data: mockTransactions()
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
