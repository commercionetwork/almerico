import mutations from "../mutations";
import {
  initialState
} from "../index";

describe("store/validators/mutations", () => {
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

  test("Check mutations.setFilter", () => {
    const filter = {
      id: 1
    };

    mutations.setFilter(state, filter);

    expect(state.filter).toStrictEqual(filter);
  });

  test("Check mutations.setValidators", () => {
    const validators = [{
      id: 1
    }];

    mutations.setValidators(state, validators);

    expect(state.validators).toStrictEqual(validators);
  });

  test("Check mutations.addValidators", () => {
    const validators = [{
      id: 1
    }];
    mutations.setValidators(state, validators);

    const newValidators = [{
      id: 2
    }];

    mutations.addValidators(state, newValidators);

    const expectedValue = [{
      id: 1
    }, {
      id: 2
    }];
    expect(state.validators).toStrictEqual(expectedValue);
  });

  test("Check mutations.setHeightValidatorsSets", () => {
    const heightValidatorsSets = [{
      id: 1
    }];

    mutations.setHeightValidatorsSets(state, heightValidatorsSets);

    expect(state.heightValidatorsSets).toStrictEqual(heightValidatorsSets);
  });

  test("Check mutations.setLatestValidatorsSets", () => {
    const latestValidatorsSets = [{
      id: 1
    }];

    mutations.setLatestValidatorsSets(state, latestValidatorsSets);

    expect(state.latestValidatorsSets).toStrictEqual(latestValidatorsSets);
  });

  test("Check mutations.updateValidatorsSets", () => {
    const latestValidatorsSets = [{
      id: 1
    }];
    mutations.setLatestValidatorsSets(state, latestValidatorsSets);

    const validatorsSets = [{
      id: 2
    }];

    mutations.updateValidatorsSets(state, validatorsSets);

    const expectedValue = [{
      id: 1
    }, {
      id: 2
    }];
    expect(state.latestValidatorsSets).toStrictEqual(expectedValue);
  });

  test("Check mutations.setDetails", () => {
    const details = {
      id: 1
    };

    mutations.setDetails(state, details);

    expect(state.details).toStrictEqual(details);
  });

  test("Check mutations.addDetails", () => {
    const details = {
      id: 1
    };
    mutations.setDetails(state, details);

    const data = {
      name: "name"
    };
    mutations.addDetails(state, data);

    const expectedValue = {
      id: 1,
      name: "name"
    };

    expect(state.details).toStrictEqual(expectedValue);
  });

  test("Check mutations.resetDetails", () => {
    const details = {
      id: 1
    };
    mutations.setDetails(state, details);

    mutations.resetDetails(state);

    expect(state.details).toStrictEqual({});
  });
});