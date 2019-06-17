/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";

describe("store/stake/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.getValidators' dispatch action 'fetchValidators'", () => {
    const dispatch = jest.fn();

    actions.getValidators({
      dispatch
    }, {
      status: "bonded",
      page: 1,
      limit: 10
    });

    expect(dispatch).toBeCalledWith("fetchValidators", {
      status: "bonded",
      page: 1,
      limit: 10
    });
  });

  it("Check if 'actions.fetchValidators' sets validators", () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchValidators' has an error", () => {
    //TODO: implement
  });

  it("Check 'actions.fetchValidators' when server is unreachable", () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchPool' sets pool", async () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchPool' has an error", async () => {
    //TODO: implement
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
      code: 400,
      data: {
        param: "param"
      },
      message: "error"
    }
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
