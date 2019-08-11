/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockTransaction, mockTransactions
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
    const tag = "tag";
    const limit = 1;

    await actions.fetchTransactions({
      commit
    }, { tag, limit });

    expect(commit).toHaveBeenCalledWith("addTransactions", mockResponse.data.txs);
  });

  it("Check if 'actions.fetchTransactions' has an error", async () => {
    const commit = jest.fn();
    const tag = "tag";
    const limit = 1;
    mockError = true;

    await actions.fetchTransactions({
      commit
    }, { tag, limit });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchTransactions' has a request error", async () => {
    const commit = jest.fn();
    const tag = "tag";
    const limit = 1;
    mockErrorRequest = true;

    await actions.fetchTransactions({
      commit
    }, { tag, limit });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchTransactions' when server is unreachable", async () => {
    const commit = jest.fn();
    const tag = "tag";
    const limit = 1;
    mockErrorServer = true;

    await actions.fetchTransactions({
      commit
    }, { tag, limit });

    expect(commit).toBeCalledWith("setServerReachability", false, {
      root: true
    });
  });

  it("Check if 'actions.fetchTransaction' set transaction details", async () => {
    const commit = jest.fn();
    const hash = "hash";

    await actions.fetchTransaction({
      commit
    }, hash);

    expect(commit).toHaveBeenCalledWith("setDetails", mockResponse.data);
  });

  it("Check if 'actions.fetchTransaction' has an error", async () => {
    const commit = jest.fn();
    const hash = "hash";
    mockError = true;

    await actions.fetchTransaction({
      commit
    }, hash);

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchTransaction' has a request error", async () => {
    const commit = jest.fn();
    const hash = "hash";
    mockErrorRequest = true;

    await actions.fetchTransaction({
      commit
    }, hash);

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchTransaction' when server is unreachable", async () => {
    const commit = jest.fn();
    const hash = "hash";
    mockErrorServer = true;

    await actions.fetchTransaction({
      commit
    }, hash);

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
          data: {
            total_count: "10",
            count: "10",
            page_number: "1",
            page_total: "1",
            limit: "30",
            txs: mockTransactions()
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestTransaction: () => {
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
          data: mockTransaction()
        };
        resolve(mockResponse);
      }, 1);
    });
  }
}));
