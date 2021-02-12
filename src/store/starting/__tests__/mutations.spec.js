import mutations from "../mutations";
import {
  initialState
} from "../index";

describe("store/starting/mutations", () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...initialState
    };
  });

  test("Check mutations.startLoading", () => {
    state.error = "error";

    mutations.startLoading(state);

    expect(state.error).toBeNull;
    expect(state.isLoading).toBe(true);
  });

  test("Check mutations.stopLoading", () => {
    state.isLoading = true;

    mutations.stopLoading(state);

    expect(state.isLoading).toBe(false);
  });

  test("Check mutations.setError", () => {
    const error = JSON.stringify({
      message: "mutation error",
      status: 400
    });

    mutations.setError(state, error);

    expect(state.error).toBe(error);
  });

  test("Check mutations.setNodeInfo", () => {
    const nodeInfo = {
      id: 1
    };

    mutations.setNodeInfo(state, nodeInfo);

    expect(state.nodeInfo).toStrictEqual(nodeInfo);
  });

  test("Check mutations.setPool", () => {
    const pool = {
      id: 1
    };

    mutations.setPool(state, pool);

    expect(state.pool).toStrictEqual(pool);
  });

  test("Check mutations.setParams", () => {
    const params = {
      id: 1
    };

    mutations.setParams(state, params);

    expect(state.params).toStrictEqual(params);
  });
});