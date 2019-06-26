/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";

describe("store/validators/actions", () => {
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

  it("Check if 'actions.fetchValidators' sets validators", async () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchValidators' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchValidators({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check 'actions.fetchValidators' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchValidators({
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
  requestValidators: () => {
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
            //TODO: implement
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
