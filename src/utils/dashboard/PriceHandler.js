import { dateHandler } from '@/utils';
import { RANGE } from '@/constants';

export default class PriceHandler {
  constructor(firstRate, rateUpdates, range) {
    this.firstRate = firstRate;
    this.rateUpdates = rateUpdates;
    this.range = range;
  }

  getListingsByRange() {
    const startingDay = this._getStartingDay(this.range);
    const listings = this._getAllListings();
    return listings.length < 2
      ? this._buildNeededListings(listings, startingDay)
      : this._filterListings(listings, startingDay);
  }

  _getStartingDay() {
    switch (this.range) {
      case RANGE.TODAY:
        return dateHandler.getSubtractedDate(1, 'day');
      case RANGE.WEEK:
        return dateHandler.getSubtractedDate(7, 'day');
      case RANGE.MONTH:
        return dateHandler.getSubtractedDate(1, 'month');
      default:
        return dateHandler.getSubtractedDate(1, 'month');
    }
  }

  _getAllListings() {
    let all = [];
    all.push(
      new Listing(1 / parseFloat(this.firstRate.rate), this.firstRate.date),
    );
    for (const update of this.rateUpdates) {
      const priceMutation = new PriceMutation(update);
      all.push(priceMutation.getNewListing());
    }
    return all;
  }

  _buildNeededListings(listings, startingDay) {
    const price = listings[0].price;
    const startingListing = new Listing(price, startingDay);
    const todayListing = new Listing(price, dateHandler.getUtcDate());
    return [startingListing, todayListing];
  }

  _filterListings(listings, startingDay) {
    const firstDiscarded = this._getFirstDiscarded(listings, startingDay);
    const filteredListings = listings.filter(
      (listing) => dateHandler.getDifference(startingDay, listing.date) > 0,
    );

    if (filteredListings.length < 2) {
      return this._buildFilteredListings(
        filteredListings,
        firstDiscarded,
        startingDay,
      );
    }

    filteredListings[0].date = startingDay;
    return filteredListings;
  }

  _getFirstDiscarded(listings, startingDay) {
    const firstSelectedIndex = listings.findIndex(
      (listing) => dateHandler.getDifference(startingDay, listing.date) > 0,
    );
    return firstSelectedIndex < 1
      ? listings[listings.length - 1]
      : listings[firstSelectedIndex - 1];
  }

  _buildFilteredListings(listings, firstDiscarded, startingDay) {
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
  }
}

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
