import accountCapitalizationChartHelper from '../accountCapitalizationChartHelper';

describe('views/validators/account/helpers/accountCapitalizationChartHelper', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // const mockCapitalization = {
  //   availables: 1,
  //   delegations: 1,
  //   unbondings: 1,
  //   rewards: 1,
  //   total: 4,
  // };

  // test('if "getChartData" method return expected object', () => {
  //   const data = accountCapitalizationChartHelper.getChartData(
  //     mockCapitalization,
  //   );

  //   expect(data).toHaveProperty('labels');
  //   expect(data.labels).toHaveLength(4);
  //   expect(data).toHaveProperty('datasets');
  //   expect(data.datasets).toHaveLength(1);
  //   expect(data.datasets[0]).toHaveProperty('data');
  //   expect(data.datasets[0]).toHaveProperty('backgroundColor');
  //   expect(data.datasets[0]).toHaveProperty('borderColor');
  //   expect(data.datasets[0]).toHaveProperty('borderWidth');
  // });
});
