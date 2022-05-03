import { VALIDATORS } from '@/constants';
import { orderBy } from 'lodash';
import Validator from './validatorSchema';

const validatorsListHelper = {
  getHeaders(translator, context) {
    const $t = translator.bind(context);
    let headers = [
      { text: $t('labels.rank'), value: 'rank' },
      { text: $t('labels.validator'), value: 'moniker', width: '35%' },
      { text: $t('labels.tokens'), value: 'tokens', width: '20%' },
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
    ];
    if (VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY) {
      headers.push({
        text: $t('labels.blocksPercentage'),
        value: 'attendance',
        width: '10%',
      });
    }
    return headers;
  },
  getItems({ validators, bookmarks, filter }) {
    const sortedValidators = _sortValidators(validators);
    const processedValidators = _processValidators(sortedValidators, bookmarks);
    return _filterValidators(processedValidators, filter.status);
  },
};

export default validatorsListHelper;

const _sortValidators = (validators) => {
  const bondedValidators = [];
  const unbondedValidators = [];
  for (const validator of validators) {
    if (validator.status === VALIDATORS.STATUS.BONDED) {
      bondedValidators.push(validator);
    } else {
      unbondedValidators.push(validator);
    }
  }
  const bondedSorted = orderBy(
    bondedValidators,
    (validator) => parseInt(validator.tokens),
    ['desc']
  );
  const unbondedSorted = orderBy(
    unbondedValidators,
    (validator) => parseInt(validator.tokens),
    ['desc']
  );
  return bondedSorted.concat(unbondedSorted);
};

const _processValidators = (validators, bookmarks) => {
  let rank = 1;
  return validators.map((it) => {
    const validator = new Validator(rank, it, bookmarks);
    ++rank;
    return validator.item;
  });
};

const _filterValidators = (validators, status) => {
  switch (status) {
    case VALIDATORS.FILTER.ACTIVE:
      return validators.filter((validator) => validator.active === true);
    case VALIDATORS.FILTER.INACTIVE:
      return validators.filter((validator) => validator.active === false);
    case VALIDATORS.FILTER.BOOKMARK:
      return validators.filter((validator) => validator.bookmark === true);
    default:
      return validators;
  }
};
