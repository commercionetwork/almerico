import { getMinHeight } from '../actions';

describe('store/validators/actions - helpers', () => {
  test('if "getMinHeight" return the wanted value', () => {
    const items = 100;

    let firstHeight = 1;
    let maxHeight = 10;
    let expectedValue = 1;

    let minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);

    firstHeight = 1;
    maxHeight = 1000;
    expectedValue = 900;

    minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);

    firstHeight = 1000;
    maxHeight = 1010;
    expectedValue = 1000;

    minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);

    firstHeight = 1000;
    maxHeight = 2000;
    expectedValue = 1900;

    minHeight = getMinHeight(items, firstHeight, maxHeight);
    expect(minHeight).toBe(expectedValue);
  });
});
