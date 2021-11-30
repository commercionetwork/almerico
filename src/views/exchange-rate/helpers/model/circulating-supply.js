import { EXCHANGE_RATE } from '@/constants';
import { Row } from './index';

export default {
  getRows({ maxSupply, nonCirculatingSupply, translator }) {
    const $t = translator;
    const maxSupplyRow = _getMaxSupplyRow(maxSupply, $t('labels.maxSupply'));
    const nonCirculatingSupplyRow = _getNonCirculatingSupplyRow(
      maxSupply,
      nonCirculatingSupply,
      $t('labels.totalNonCirculatingSupply'),
    );
    const circulatingSupplyRow = _getCirculatingSupplyRow(
      maxSupply,
      nonCirculatingSupply,
      $t('labels.totalCirculatingSupply'),
    );
    return [maxSupplyRow, nonCirculatingSupplyRow, circulatingSupplyRow];
  },
  getTotal(maxSupply, nonCirculatingSupply) {
    return maxSupply - nonCirculatingSupply;
  },
};

const _getMaxSupplyRow = (maxSupply, label) =>
  new Row({
    rank: 1,
    label,
    value: maxSupply,
    total: maxSupply,
  });

const _getNonCirculatingSupplyRow = (maxSupply, nonCirculatingSupply, label) =>
  new Row({
    rank: 2,
    label,
    value: nonCirculatingSupply,
    total: maxSupply,
  });

const _getCirculatingSupplyRow = (maxSupply, nonCirculatingSupply, label) =>
  new Row({
    rank: 3,
    label,
    value: maxSupply - nonCirculatingSupply,
    total: maxSupply,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
