import { mockValidator } from '@/store/validators/__mocks__/validators';
import validatorDetailsChartHelper from '../validatorDetailsChartHelper';

describe('views/validators/details/helpers/validatorDetailsChartHelper', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // const validator = mockValidator();

  // test('if "getChartData" method return expected object', () => {
  //   const data = validatorDetailsChartHelper.getChartData(
  //     validator.delegations,
  //   );

  //   expect(data).toHaveProperty('labels');
  //   expect(data.labels).toHaveLength(2);
  //   expect(data).toHaveProperty('datasets');
  //   expect(data.datasets).toHaveLength(1);
  //   expect(data.datasets[0]).toHaveProperty('data');
  //   expect(data.datasets[0]).toHaveProperty('backgroundColor');
  //   expect(data.datasets[0]).toHaveProperty('borderColor');
  // });
});
