import { initState } from '../index';
import mutations from '../mutations';

describe('store/proposals/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.list = [{ id: 1 }];
    state.filter = 'filter';
    state.detail = { id: 1 };
    state.pool = { id: 1 };
    state.tallyParams = { id: 1 };

    const expected = initState();

    mutations.reset(state);

    expect(state).toStrictEqual(expected);
  });

  test('mutations.setError', () => {
    const payload = { message: 'error' };

    mutations.setError(state, payload);

    expect(state.error).toBe(payload);
  });

  test('mutations.setLoading', () => {
    mutations.setLoading(state, true);

    expect(state.isLoading).toBe(true);
  });

  test('mutations.setList', () => {
    const payload = [{ id: 1 }];

    mutations.setList(state, payload);

    expect(state.list).toStrictEqual(payload);
  });

  test('mutations.setFilter', () => {
    const payload = 'filter';

    mutations.setFilter(state, payload);

    expect(state.filter).toStrictEqual(payload);
  });

  test('mutations.setDetail', () => {
    const detail = { id: 1 };
    const tally = { tally: { id: 1 } };
    const votes = { votes: [{ id: 1 }] };
    const expectedDetail = {
      id: 1,
      tally: { id: 1 },
      votes: [{ id: 1 }],
    };

    mutations.setDetail(state, detail);
    mutations.setDetail(state, tally);
    mutations.setDetail(state, votes);

    expect(state.detail).toStrictEqual(expectedDetail);
  });

  test('mutations.setPool', () => {
    const payload = { id: 1 };

    mutations.setPool(state, payload);

    expect(state.pool).toStrictEqual(payload);
  });

  test('mutations.setTallyParams', () => {
    const payload = { id: 1 };

    mutations.setTallyParams(state, payload);

    expect(state.tallyParams).toStrictEqual(payload);
  });
});
