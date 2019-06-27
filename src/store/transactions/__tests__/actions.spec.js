/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockTransactions
} from "../__mocks__/transactions";

describe("store/transactions/actions", () => {
  beforeEach(() => {
    mockError = false;
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

const mockErrorResponse = {
  response: {
    data: {
      error: "error",
    },
    status: 400
  }
};
let mockError = false;
let mockErrorServer = false;
let mockResponse = null;

jest.mock("./../api", () => ({
  requestTransactions: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
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
