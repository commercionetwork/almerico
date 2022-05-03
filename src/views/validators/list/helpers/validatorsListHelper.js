import { VALIDATORS } from '@/constants';
import { orderBy } from 'lodash';
import Validator from './validatorSchema';

const validatorsListHelper = {
  build({ validators, bookmarks, params, filter }) {
    const sortedValidators = _sortValidators(validators);
    const processedValidators = _processValidators(
      sortedValidators,
      bookmarks,
      params
    );
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

const _processValidators = (validators, bookmarks, params) => {
  const coin = params.bond_denom || '';
  let rank = 1;
  return validators.map((it) => {
    const validator = new Validator(rank, it, bookmarks, coin);
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
