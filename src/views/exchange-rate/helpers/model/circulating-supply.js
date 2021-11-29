import { EXCHANGE_RATE } from '@/constants';
import { Row } from './index';

export default {
  getRows(maxSupply, nonCirculatingSupply) {
    const maxSupplyRow = _getMaxSupplyRow(maxSupply);
    const nonCirculatingSupplyRow = _getNonCirculatingSupplyRow(
      maxSupply,
      nonCirculatingSupply,
    );
    const circulatingSupplyRow = _getCirculatingSupplyRow(
      maxSupply,
      nonCirculatingSupply,
    );
    return [maxSupplyRow, nonCirculatingSupplyRow, circulatingSupplyRow];
  },
  getTotal(maxSupply, nonCirculatingSupply) {
    return maxSupply - nonCirculatingSupply;
  },
};

const _getMaxSupplyRow = (maxSupply) =>
  new Row({
    rank: 1,
    label: 'Max Supply',
    value: maxSupply,
    total: maxSupply,
  });

const _getNonCirculatingSupplyRow = (maxSupply, nonCirculatingSupply) =>
  new Row({
    rank: 2,
    label: 'Total Non Circulating Supply',
    value: nonCirculatingSupply,
    total: maxSupply,
  });

const _getCirculatingSupplyRow = (maxSupply, nonCirculatingSupply) =>
  new Row({
    rank: 3,
    label: 'Total Circulating Supply',
    value: maxSupply - nonCirculatingSupply,
    total: maxSupply,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
