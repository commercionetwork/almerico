import { dateHandler } from '@/utils';
import { RANGE } from '@/constants';

export default class PriceHandler {
  constructor(firstRate, rateUpdates, range) {
    this.firstRate = firstRate;
    this.rateUpdates = rateUpdates;
    this.range = range;
  }

  getAllListings() {
    let all = [];
    all.push(
      new Listing(1 / parseFloat(this.firstRate.rate), this.firstRate.date),
    );
    for (const update of this.rateUpdates) {
      const priceMutation = new PriceMutation(update);
      all.push(priceMutation.get());
    }
    return all;
  }

  getListingsByRange() {
    const listings = this.getAllListings();
    if (listings.length === 1) {
      const todayListing = new Listing(
        listings[0].price,
        dateHandler.getUtcDate(),
      );
      listings.push(todayListing);
      return listings;
    }

    const startingDay = getStartingDay(this.range);
    const firstSelectedIndex = listings.findIndex(
      (listing) => dateHandler.getDifference(startingDay, listing.date) > 0,
    );
    let firstDiscarded = {};
    if (firstSelectedIndex < 1) {
      firstDiscarded = { ...listings[listings.length - 1] };
    } else {
      firstDiscarded = { ...listings[firstSelectedIndex - 1] };
    }

    const filteredListings = listings.filter(
      (listing) => dateHandler.getDifference(startingDay, listing.date) > 0,
    );

    if (filteredListings.length === 0) {
      filteredListings.unshift(firstDiscarded);
      const nextListing = new Listing(
        firstDiscarded.price,
        dateHandler.getUtcDate(),
      );
      filteredListings.push(nextListing);
    }

    return filteredListings;
  }
}

const getStartingDay = (range) => {
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

class PriceMutation {
  constructor(update) {
    this.update = update;
  }

  get() {
    return new Listing(this.getPrice(), this.update.timestamp);
  }

  getPrice() {
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
