import { VALIDATORS } from '@/constants';

const validatorsTableHelper = {
  getCaption(filter, translator, context) {
    const status = filter.status;
    const $t = translator.bind(context);
    switch (status) {
      case VALIDATORS.FILTER.ACTIVE:
        return $t('titles.activeValidatorsList');
      case VALIDATORS.FILTER.INACTIVE:
        return $t('titles.inactiveValidatorsList');
      case VALIDATORS.FILTER.BOOKMARK:
        return $t('titles.myValidators');
      default:
        return $t('titles.validatorsList');
    }
  },
  getHeaders(translator, context) {
    const $t = translator.bind(context);
    let headers = [
      { text: $t('labels.rank'), value: 'rank' },
      { text: $t('labels.validator'), value: 'moniker', width: '32%' },
      { text: $t('labels.tokens'), value: 'tokens', width: '16%' },
      {
        text: $t('labels.commission'),
        value: 'commission',
        width: '10%',
      },
      {
        text: $t('labels.votingPower'),
        value: 'votingPower',
        width: '10%',
      },
      {
        text: $t('labels.cumulative'),
        value: 'cumulative',
        width: '10%',
      },
      {
        text: $t('labels.blocksPercentage'),
        value: 'attendance',
        width: '10%',
      },
      { text: '', value: 'operator_address', width: '7%' },
    ];
    return headers;
  },
  getItems({ validators, bookmarks, filter }) {
    const items = _bookmarkItems({ items: validators, bookmarks });
    return _filterItems({ items, filter });
  },
};

export default validatorsTableHelper;

const _bookmarkItems = ({ items, bookmarks }) => {
  return items.map((it) => {
    it.bookmark =
      bookmarks.findIndex((address) => address === it.operator_address) > -1;
    return it;
  });
};

const _filterItems = ({ items, filter }) => {
  const status = filter.status;
  switch (status) {
    case VALIDATORS.FILTER.ACTIVE:
      return items.filter((it) => it.active === true);
    case VALIDATORS.FILTER.INACTIVE:
      return items.filter((it) => it.active === false);
    case VALIDATORS.FILTER.BOOKMARK:
      return items.filter((it) => it.bookmark === true);
    default:
      return items;
  }
};
