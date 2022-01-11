import { getMinHeight } from '../actions';

describe('store/validators/actions - helpers', () => {
  test('if "getMinHeight" return the wanted value', () => {
    const items = 100;

    let firstHeight = 1;
    let maxHeight = 100;
    let expectedValue = 1;

    let minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);

    firstHeight = 1;
    maxHeight = 101;
    expectedValue = 1;

    minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);

    firstHeight = 1;
    maxHeight = 102;
    expectedValue = 2;

    minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);

    firstHeight = 1000;
    maxHeight = 1099;
    expectedValue = 1000;

    minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);

    firstHeight = 1000;
    maxHeight = 1100;
    expectedValue = 1000;

    minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);

    firstHeight = 1000;
    maxHeight = 1101;
    expectedValue = 1001;

    minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);
  });
});
