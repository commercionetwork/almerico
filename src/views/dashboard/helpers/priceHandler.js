import { dateHandler } from '@/utils';
import { RANGE } from '@/constants';

const priceHandler = {
  /**
   * @typedef {Object} GetListingsByRangeParams
   * @property {Object} firstRate
   * @property {Array.<Object>} rateUpdates
   * @property {String} range
   *
   * @param {GetListingsByRangeParams} params
   * @returns {Array.<Object>}
   */
  getListingsByRange({ firstRate, rateUpdates, range }) {
    const startingDay = _getStartingDay(range);
    const listings = _getAllListings(firstRate, rateUpdates);
    return listings.length < 2
      ? _buildNeededListings(listings, startingDay)
      : _filterListings(listings, startingDay);
  },
};

export default priceHandler;

const _getStartingDay = (range) => {
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

const _getAllListings = (firstRate, rateUpdates) => {
  let all = [];
  all.push(new Listing(1 / parseFloat(firstRate.rate), firstRate.date));
  for (const update of rateUpdates) {
    const priceMutation = new PriceMutation(update);
    all.push(priceMutation.getNewListing());
  }
  return all;
};

const _buildNeededListings = (listings, startingDay) => {
  const price = listings[0].price;
  const startingListing = new Listing(price, startingDay);
  const todayListing = new Listing(price, dateHandler.getUtcDate());
  return [startingListing, todayListing];
};

const _filterListings = (listings, startingDay) => {
  const firstDiscarded = _getFirstDiscarded(listings, startingDay);
  const filteredListings = listings.filter(
    (listing) => dateHandler.getDifference(startingDay, listing.date) > 0,
  );

  if (filteredListings.length < 2) {
    return _buildFilteredListings(
      filteredListings,
      firstDiscarded,
      startingDay,
    );
  }

  filteredListings[0].date = startingDay;
  return filteredListings;
};

const _getFirstDiscarded = (listings, startingDay) => {
  const firstSelectedIndex = listings.findIndex(
    (listing) => dateHandler.getDifference(startingDay, listing.date) > 0,
  );
  return firstSelectedIndex < 1
    ? listings[listings.length - 1]
    : listings[firstSelectedIndex - 1];
};

const _buildFilteredListings = (listings, firstDiscarded, startingDay) => {
  const filteredListings = listings.map((listing) => ({ ...listing }));
  const listing = new Listing(firstDiscarded.price, dateHandler.getUtcDate());
  if (filteredListings.length === 0) {
    filteredListings.push(firstDiscarded);
    filteredListings.push(listing);
  } else {
    filteredListings.unshift(listing);
  }
  filteredListings[0].date = startingDay;
  return filteredListings;
};

class PriceMutation {
  constructor(update) {
    this.update = update;
  }

  getNewListing() {
    return new Listing(this._getPrice(), this.update.timestamp);
  }

  _getPrice() {
    const type = 'commercio/MsgSetCCCConversionRate';
    const msgs = this.update.tx.value.msg;
    const index = msgs.findIndex((msg) => msg.type === type);
    return 1 / parseFloat(msgs[index].value.rate);
  }
}

class Listing {
  constructor(price, date) {
    this.price = price;
    this.date = date;
  }
}
