/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
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
    const commit = jest.fn();

    await actions.fetchValidators({
      commit
    });
    
    expect(commit).toHaveBeenCalledWith("setValidators", mockResponse.data);
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

  it("Check if 'actions.updateValidators' add validators", async () => {
    const commit = jest.fn();

    await actions.updateValidators({
      commit
    });
    
    expect(commit).toHaveBeenCalledWith("addValidators", mockResponse.data);
  });

  it("Check if 'actions.updateValidators' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.updateValidators({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.updateValidators' has a request error", async () => {
    const commit = jest.fn();
    mockErrorRequest = true;

    await actions.updateValidators({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.updateValidators' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.updateValidators({
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
