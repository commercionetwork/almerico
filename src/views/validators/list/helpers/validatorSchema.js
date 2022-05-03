import { CONFIG, VALIDATORS } from '@/constants';
import { bech32Manager } from '@/utils';

class Validator {
  constructor(rank, data, bookmarks) {
    this.rank = rank;
    this.data = data;
    this.bookmarks = bookmarks;
  }

  get item() {
    const active = this.data.status === VALIDATORS.STATUS.BONDED ? true : false;
    const operator = this.data.operator_address;
    const bookmark =
      this.bookmarks.findIndex((address) => address === operator) > -1;
    const logo = this.data.logo || '';
    const moniker = this.data.description.moniker;
    const tokens = this.data.tokens;
    const commission = this.data.commission.commission_rates.rate;
    const account = _getAccountAddress(
      operator,
      CONFIG.PREFIXES.ACCOUNT.ADDRESS
    );

    return {
      active,
      rank: this.rank,
      bookmark,
      logo,
      moniker,
      operator,
      tokens,
      commission,
      account,
    };
  }
}

const _getAccountAddress = (address, prefix) => {
  const hexValue = bech32Manager.decode(address);
  return bech32Manager.encode(hexValue, prefix);
};

export default Validator;
