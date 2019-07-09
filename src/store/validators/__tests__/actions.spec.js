/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  VALIDATOR_STATUS
} from "Constants";
import {
  mockValidators
} from "../__mocks__/validators";

describe("store/validators/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.getValidators' commit mutation 'setValidators' and dispatch action 'fetchValidators'", () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    actions.getValidators({
      commit,
      dispatch
    }, {
      status: [VALIDATOR_STATUS.BONDED],
      page: 1,
      limit: 10
    });

    expect(commit).toBeCalledWith("setValidators", []);
    expect(dispatch).toBeCalledWith("fetchValidators", {
      status: VALIDATOR_STATUS.BONDED,
      page: 1,
      limit: 10
    });
  });

  it("Check if 'actions.addValidators' dispatch action 'fetchValidators'", () => {
    const dispatch = jest.fn();

    actions.addValidators({
      dispatch
    }, {
      status: [VALIDATOR_STATUS.BONDED],
      page: 1,
      limit: 10
    });

    expect(dispatch).toBeCalledWith("fetchValidators", {
      status: VALIDATOR_STATUS.BONDED,
      page: 1,
      limit: 10
    });
  });

  it("Check if 'actions.fetchValidators' adds validators", async () => {
    const commit = jest.fn();

    await actions.fetchValidators({
      commit
    });

    expect(commit).toHaveBeenCalledWith("addValidators", mockResponse.data);
  });

  it("Check if 'actions.fetchValidators' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchValidators({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchValidators' has a request error", async () => {
    const commit = jest.fn();
    mockErrorRequest = true;

    await actions.fetchValidators({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
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
  requestValidators: () => {
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
          data: mockValidators()
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
