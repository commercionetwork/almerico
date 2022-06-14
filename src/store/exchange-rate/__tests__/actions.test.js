import { mockErrors } from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/exchange-rate/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initExchangeRate" reset store, set loading state, dispatch "fetchChart" and "fetchOverview" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initExchangeRate({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchChart');
    expect(dispatch).toHaveBeenCalledWith('fetchOverview');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });
});
