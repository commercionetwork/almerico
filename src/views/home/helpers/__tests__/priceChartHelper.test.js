import { HOME } from '@/constants';
import { dateHandler } from '@/utils';
import { mockParamsUpdates } from '@/__mocks__';
import priceChartHelper, {
  _getListings,
  _getStartingUTCDate,
  _buildListingsFromSingleValue,
} from '../priceChartHelper';

describe('views/home/helpers/priceChartHelper', () => {
  const mockDate = dateHandler.getUtcDate('1/1/2021');

  test('if "getChartData" return the data to render the chart', () => {
    const range = HOME.RANGE.MONTH;

    const chartData = priceChartHelper.getChartData({
      firstDate: mockDate,
      paramsUpdates: mockParamsUpdates(),
      range,
    });

    const expectedKeys = ['labels', 'datasets'];
    const expectedDatasetKeys = [
      'data',
      'fill',
      'backgroundColor',
      'borderColor',
      'pointBackgroundColor',
    ];

    expect(Object.keys(chartData)).toStrictEqual(expectedKeys);
    expect(chartData.datasets.length).toBe(1);
    expect(Object.keys(chartData.datasets[0])).toStrictEqual(
      expectedDatasetKeys
    );
  });

  test('if "_getListings" return label and data to build the chart', () => {
    const range = HOME.RANGE.MONTH;

    const listings = _getListings({
      firstDate: mockDate,
      paramsUpdates: mockParamsUpdates(),
      range,
    });

    const expectedKeys = ['labels', 'data'];

    expect(Object.keys(listings)).toStrictEqual(expectedKeys);
  });

  test('if "_getStartingUTCDate" return right date', () => {
    const range = HOME.RANGE.MONTH;
    let firstDate = dateHandler.getSubtractedDate(1, 'day');

    let startDate = _getStartingUTCDate(firstDate, range);

    expect(startDate).toBe(firstDate);

    firstDate = dateHandler.getSubtractedDate(2, 'month');

    startDate = _getStartingUTCDate(firstDate, range);

    expect(startDate).toBe(dateHandler.getSubtractedDate(1, range));
  });

  test('if "_buildListingsFromSingleValue" return 2 listings', () => {
    const rate = '1';

    const listings = _buildListingsFromSingleValue(rate, mockDate);

    expect(listings.labels.length).toBe(2);
    expect(listings.data.length).toBe(2);
  });
});
