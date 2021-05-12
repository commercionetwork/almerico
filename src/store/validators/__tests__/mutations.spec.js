import mutations from '../mutations';
import store from '../index';

describe('store/validators/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...store.initialState,
    };
  });

  test('mutations.startLoading', () => {
    state.error = { message: 'error', status: 400 };

    mutations.startLoading(state);

    expect(state.error).toBeNull;
    expect(state.isLoading).toBe(true);
  });

  test('mutations.stopLoading', () => {
    state.isLoading = true;

    mutations.stopLoading(state);

    expect(state.isLoading).toBe(false);
  });

  test('mutations.setError', () => {
    const error = { message: 'error', status: 400 };

    mutations.setError(state, error);

    expect(state.error).toStrictEqual(error);
  });

  test('mutations.setFilter', () => {
    const filter = {
      id: 1,
    };

    mutations.setFilter(state, filter);

    expect(state.filter).toStrictEqual(filter);
  });

  test('mutations.setValidators', () => {
    const validators = [
      {
        id: 1,
      },
    ];

    mutations.setValidators(state, validators);

    expect(state.validators).toStrictEqual(validators);
  });

  test('mutations.addValidators', () => {
    const validators = [
      {
        id: 1,
      },
    ];
    mutations.setValidators(state, validators);

    const newValidators = [
      {
        id: 2,
      },
    ];

    mutations.addValidators(state, newValidators);

    const expectedValue = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    expect(state.validators).toStrictEqual(expectedValue);
  });

  test('mutations.setHeightValidatorsSets', () => {
    const heightValidatorsSets = [
      {
        id: 1,
      },
    ];

    mutations.setHeightValidatorsSets(state, heightValidatorsSets);

    expect(state.heightValidatorsSets).toStrictEqual(heightValidatorsSets);
  });

  test('mutations.setLatestValidatorsSets', () => {
    const latestValidatorsSets = [
      {
        id: 1,
      },
    ];

    mutations.setLatestValidatorsSets(state, latestValidatorsSets);

    expect(state.latestValidatorsSets).toStrictEqual(latestValidatorsSets);
  });

  test('mutations.setDetails', () => {
    const details = {
      id: 1,
    };

    mutations.setDetails(state, details);

    expect(state.details).toStrictEqual(details);
  });

  test('mutations.addDetails', () => {
    const details = {
      id: 1,
    };
    mutations.setDetails(state, details);

    const data = {
      name: 'name',
    };
    mutations.addDetails(state, data);

    const expectedValue = {
      id: 1,
      name: 'name',
    };

    expect(state.details).toStrictEqual(expectedValue);
  });

  test('mutations.resetDetails', () => {
    const details = {
      id: 1,
    };
    mutations.setDetails(state, details);

    mutations.resetDetails(state);

    expect(state.details).toStrictEqual({});
  });
});
