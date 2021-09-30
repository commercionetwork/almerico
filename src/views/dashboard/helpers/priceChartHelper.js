import { dateHandler } from '@/utils';
import { RANGE } from '@/constants';
import { orderBy } from 'lodash';

const priceChartHelper = {
  /**
   *
   * @typedef {Object} GetAllSortedListingsParams
   * @property {Object} firstRate
   * @property {Array.<Object>} rateUpdates
   *
   * @param {GetAllSortedListingsParams} params
   * @returns {Array.<Object>}
   */
  getAllSortedListings({ firstRate, rateUpdates }) {
    let all = [];
    all.push(
      new Conversion({
        rate: parseFloat(firstRate.rate),
        date: firstRate.date,
      }),
    );
    if (rateUpdates.length > 0) {
      for (const update of rateUpdates) {
        all.push(
          new Conversion({ rate: _getRate(update), date: update.timestamp }),
        );
      }
    }
    const listings = all.map(
      (it) => new Listing({ price: 1 / it.rate, date: it.date }),
    );
    return orderBy(listings, [`date`], ['asc']);
  },
  /**
   *
   * @typedef {Object} GetPriceByRangeParams
   * @property {Array.<Object>} prices
   * @property {String} range
   *
   * @param {GetPriceByRangeParams} params
   * @returns {Array.<Object>}
   */
  getListingsByRange({ listings, range }) {
    const lastListing = _getLastListing(listings);
    const startingTimestamp = _getStartingTimestamp(range);
    if (listings.length === 1) {
      return _buildFromOneListing(lastListing, startingTimestamp);
    }
    if (listings.length === 2) {
      return _buildFromTwoListings(listings, lastListing, startingTimestamp);
    }
    return _buildByRange(listings, lastListing, startingTimestamp);
  },
};

export default priceChartHelper;

const _getLastListing = (listings) => {
  const lastPrice = listings[listings.length - 1];
  return new Listing({
    price: lastPrice.price,
    date: dateHandler.getUtcDate(),
  });
};

const _getStartingTimestamp = (range) => {
  switch (range) {
    case RANGE.TODAY:
      return dateHandler.getSubtractedDate(1, 'day');
    case RANGE.WEEK:
      return dateHandler.getSubtractedDate(7, 'day');
    case RANGE.MONTH:
      return dateHandler.getSubtractedDate(1, 'month');
    default:
      return dateHandler.getSubtractedDate(1, 'month');
  }
};

const _buildFromOneListing = (lastListing, startingTimestamp) => {
  const firstListing = new Listing({
    price: lastListing.price,
    date: startingTimestamp,
  });
  return [firstListing, lastListing];
};

const _buildFromTwoListings = (listings, lastListing, startingTimestamp) => {
  const firstListing = new Listing({
    price: listings[0].price,
    date: startingTimestamp,
  });
  return [firstListing, lastListing];
};

const _buildByRange = (listings, lastListing, startingTimestamp) => {
  const filteredListings = listings.filter(
    (listing) => listing.date > startingTimestamp,
  );
  if (!filteredListings.length) {
    return _buildFromOneListing(lastListing, startingTimestamp);
  }
  if (filteredListings.length === 1) {
    return _buildFromTwoListings(
      filteredListings,
      lastListing,
      startingTimestamp,
    );
  }
  const firstListing = new Listing({ date: startingTimestamp });
  const firstDiscardedListingIndex =
    listings.findIndex((listing) => listing.date > startingTimestamp) - 1;
  firstListing.price =
    firstDiscardedListingIndex < 0
      ? listings[0]['price']
      : listings[firstDiscardedListingIndex]['price'];
  return [firstListing, ...filteredListings, lastListing];
};

const _getRate = (update) => {
  const type = 'commercio/MsgSetCCCConversionRate';
  const msgs = update.tx.value.msg;
  const index = msgs.findIndex((msg) => msg.type === type);
  return parseFloat(msgs[index].value.rate);
};

class Conversion {
  constructor({ rate, date }) {
    this.rate = rate;
    this.date = date;
  }
}

class Listing {
  constructor({ price, date }) {
    this.price = price;
    this.date = date;
  }
}
