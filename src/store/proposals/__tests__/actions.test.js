import {
  mockErrors,
  mockPagination,
  mockProposal,
  mockProposals,
  mockTally,
  mockVotes,
} from '@/__mocks__';
import actions from '../actions.js';
import { PROPOSALS } from '@/constants';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/proposals/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  test('if "initProposalsList" reset store, set loading state and get proposals', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initProposalsList({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith(
      'fetchProposals',
      PROPOSALS.STATUS.UNSPECIFIED
    );
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchProposals" save proposals, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const status = PROPOSALS.STATUS.UNSPECIFIED;

    await actions.fetchProposals({ commit }, status);

    expect(commit).toHaveBeenCalledWith(
      'setProposals',
      mockResponse.data.proposals
    );

    mockError = true;

    await actions.fetchProposals({ commit }, status);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "searchProposals" reset stored proposals and get proposals', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const status = PROPOSALS.STATUS.UNSPECIFIED;

    await actions.searchProposals({ commit, dispatch }, status);

    expect(commit).toHaveBeenCalledWith('setProposals', []);
    expect(dispatch).toHaveBeenCalledWith('fetchProposals', status);
  });
});

jest.mock('../../../apis/http/governance.js', () => ({
  requestList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            proposals: mockProposals(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestDetail: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockProposal(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestTally: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: { tally: mockTally() },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestVotes: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            votes: mockVotes(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
