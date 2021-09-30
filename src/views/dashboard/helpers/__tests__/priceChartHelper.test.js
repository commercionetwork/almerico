import priceChartHelper from '../priceChartHelper';
import {
  mockFirstRate,
  mockRateUpdates,
} from '@/store/dashboard/__mocks__/listings';

describe('description', () => {
  test('description', () => {
    const all = priceChartHelper.getAllSortedListings({
      firstRate: mockFirstRate(),
      rateUpdates: mockRateUpdates(),
    });
    const listings = priceChartHelper.getListingsByRange({
      listings: all,
      range: 'today',
    });
  });
});
