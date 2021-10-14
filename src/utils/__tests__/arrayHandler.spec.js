import { arrayHandler } from '../index';

describe('utils/arrayHandler', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test("if function 'sortObjectsByNumberPropertyValueAsc' sorts array of objects by string property value in ascending order", () => {
  //   const items = [
  //     {
  //       name: 'name',
  //       tokens: '3',
  //     },
  //     {
  //       name: 'name',
  //       tokens: '1',
  //     },
  //     {
  //       name: 'name',
  //       tokens: '2',
  //     },
  //   ];
  //   const expectedValue = [
  //     {
  //       name: 'name',
  //       tokens: '1',
  //     },
  //     {
  //       name: 'name',
  //       tokens: '2',
  //     },
  //     {
  //       name: 'name',
  //       tokens: '3',
  //     },
  //   ];

  //   const orderedItems = arrayHandler.sortObjectsByNumberPropertyValueAsc(
  //     items,
  //     'tokens',
  //   );

  //   expect(orderedItems).toStrictEqual(expectedValue);
  // });

  // test("if function 'sortObjectsByNumberPropertyValueDesc' sorts array of objects by string property value in descending order", () => {
  //   const items = [
  //     {
  //       name: 'name',
  //       tokens: '3',
  //     },
  //     {
  //       name: 'name',
  //       tokens: '1',
  //     },
  //     {
  //       name: 'name',
  //       tokens: '2',
  //     },
  //   ];
  //   const expectedValue = [
  //     {
  //       name: 'name',
  //       tokens: '3',
  //     },
  //     {
  //       name: 'name',
  //       tokens: '2',
  //     },
  //     {
  //       name: 'name',
  //       tokens: '1',
  //     },
  //   ];

  //   const orderedItems = arrayHandler.sortObjectsByNumberPropertyValueDesc(
  //     items,
  //     'tokens',
  //   );

  //   expect(orderedItems).toStrictEqual(expectedValue);
  // });
  // test("if function 'sortObjectsByStringPropertyValueAsc' sorts array of objects by string property value in ascending order", () => {
  //   const items = [
  //     {
  //       name: 'name',
  //       surname: 'j_surname',
  //     },
  //     {
  //       name: 'name',
  //       surname: 'b_surname',
  //     },
  //     {
  //       name: 'name',
  //       surname: 'p_surname',
  //     },
  //   ];
  //   const expectedValue = [
  //     {
  //       name: 'name',
  //       surname: 'b_surname',
  //     },
  //     {
  //       name: 'name',
  //       surname: 'j_surname',
  //     },
  //     {
  //       name: 'name',
  //       surname: 'p_surname',
  //     },
  //   ];

  //   const orderedItems = arrayHandler.sortObjectsByStringPropertyValueAsc(
  //     items,
  //     'surname',
  //   );

  //   expect(orderedItems).toStrictEqual(expectedValue);
  // });

  // test("if function 'sortObjectsByStringPropertyValueDesc' sorts array of objects by string property value in descending order", () => {
  //   const items = [
  //     {
  //       name: 'name',
  //       surname: 'j_surname',
  //     },
  //     {
  //       name: 'name',
  //       surname: 'b_surname',
  //     },
  //     {
  //       name: 'name',
  //       surname: 'p_surname',
  //     },
  //   ];
  //   const expectedValue = [
  //     {
  //       name: 'name',
  //       surname: 'p_surname',
  //     },
  //     {
  //       name: 'name',
  //       surname: 'j_surname',
  //     },
  //     {
  //       name: 'name',
  //       surname: 'b_surname',
  //     },
  //   ];

  //   const orderedItems = arrayHandler.sortObjectsByStringPropertyValueDesc(
  //     items,
  //     'surname',
  //   );

  //   expect(orderedItems).toStrictEqual(expectedValue);
  // });
});
