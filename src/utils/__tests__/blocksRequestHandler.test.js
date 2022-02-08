import { blocksRequestHandler } from '../index';

describe('utils/blocksRequestHandler', () => {
  test('if "getMinimumHeight" return the proper value', () => {
    const min = 1;
    const items = 100;

    let max = 100;
    let minimumHeight = blocksRequestHandler.getMinimumHeight({
      max,
      min,
      items,
    });

    expect(minimumHeight).toBe(min - 1);

    max = 101;
    minimumHeight = blocksRequestHandler.getMinimumHeight({
      max,
      min,
      items,
    });

    expect(minimumHeight).toBe(max - items);
  });

  test('if "setupRequests" return an array of the correct length', () => {
    const dispatch = jest.fn();
    const action = 'action';
    const minimum = 100;
    const items = 100;

    let height = 200;
    let requests = blocksRequestHandler.setupRequests({
      dispatch,
      action,
      height,
      minimum,
      items,
    });

    expect(requests.length).toBe(items);

    height = 199;
    requests = blocksRequestHandler.setupRequests({
      dispatch,
      action,
      height,
      minimum,
      items,
    });

    expect(requests.length).toBe(height - minimum + 1);

    height = 100;
    requests = blocksRequestHandler.setupRequests({
      dispatch,
      action,
      height,
      minimum,
      items,
    });

    expect(requests.length).toBe(height - minimum + 1);
  });
});
