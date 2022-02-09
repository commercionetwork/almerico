import { blocksRequestHelper } from '../index';

describe('utils/blocksRequestHelper', () => {
  test('if "getMinimumHeight" return the proper value', () => {
    const min = 1;
    const items = 100;

    let max = 100;
    let minimumHeight = blocksRequestHelper.getMinimumHeight({
      max,
      min,
      items,
    });

    expect(minimumHeight).toBe(min - 1);

    max = 101;
    minimumHeight = blocksRequestHelper.getMinimumHeight({
      max,
      min,
      items,
    });

    expect(minimumHeight).toBe(max - items);
  });

  test('if "setupRequests" return an array of the correct length', () => {
    const dispatch = jest.fn();
    const action = 'action';
    const items = 100;
    const firstHeight = 100;

    let currentHeight = 1000;
    let minimumHeight = blocksRequestHelper.getMinimumHeight({
      max: currentHeight,
      min: firstHeight,
      items,
    });
    let requests = blocksRequestHelper.setupRequests({
      dispatch,
      action,
      height: currentHeight,
      minimumHeight,
    });

    expect(requests.length).toBe(items);

    currentHeight = 199;
    minimumHeight = blocksRequestHelper.getMinimumHeight({
      max: currentHeight,
      min: firstHeight,
      items,
    });
    requests = requests = blocksRequestHelper.setupRequests({
      dispatch,
      action,
      height: currentHeight,
      minimumHeight,
    });

    expect(requests.length).toBe(currentHeight - minimumHeight);

    currentHeight = 100;
    minimumHeight = blocksRequestHelper.getMinimumHeight({
      max: currentHeight,
      min: firstHeight,
      items,
    });
    requests = requests = blocksRequestHelper.setupRequests({
      dispatch,
      action,
      height: currentHeight,
      minimumHeight,
    });

    expect(requests.length).toBe(1);
  });
});
