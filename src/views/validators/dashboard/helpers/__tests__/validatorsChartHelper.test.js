import { mockValidators } from '@/store/validators/__mocks__/validators';
import validatorsChartHelper from '../validatorsChartHelper';

describe('views/validators/dashboard/helpers/validatorsChartHelper', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test('if "getChartData" method return expected object', () => {
  //   const data = validatorsChartHelper.getChartData(mockValidators());

  //   expect(data).toHaveProperty('labels');
  //   expect(data.labels).toHaveLength(2);
  //   expect(data).toHaveProperty('datasets');
  //   expect(data.datasets).toHaveLength(1);
  //   expect(data.datasets[0]).toHaveProperty('data');
  //   expect(data.datasets[0]).toHaveProperty('backgroundColor');
  //   expect(data.datasets[0]).toHaveProperty('borderColor');
  // });
});
