/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";

describe("store/stake/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.fetchPool' sets pool", async () => {
    const commit = jest.fn();

    await actions.fetchPool({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setPool", mockResponse.data);
  });

  it("Check if 'actions.fetchPool' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchPool({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check 'actions.fetchPool' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchPool({
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
  requestPool: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            not_bonded_tokens: "2000000",
            bonded_tokens: "1000000",
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
