import { EXCHANGE_RATE } from '@/constants';
import { getCommonHeaders, Header, Row, Table } from './commons';

export default {
  getTable({ maxSupply, nonCirculatingSupply, translator }) {
    const headers = _getHeaders(translator);
    const rows = _getRows({ maxSupply, nonCirculatingSupply, translator });
    const total = _getTotal(maxSupply, nonCirculatingSupply);
    return new Table({ headers, rows, total });
  },
};

const _getHeaders = (translator) => {
  const $t = translator;
  const header = new Header({
    text: $t('labels.circulatingSupply'),
    value: 'label',
    sortable: false,
    align: 'start',
  });
  const commonHeaders = getCommonHeaders($t);
  return [header].concat(commonHeaders);
};

const _getRows = ({ maxSupply, nonCirculatingSupply, translator }) => {
  const $t = translator;
  const maxSupplyRow = new Row({
    rank: 1,
    label: $t('labels.maxSupply'),
    value: maxSupply,
    total: maxSupply,
  });
  const nonCirculatingSupplyRow = new Row({
    rank: 2,
    label: $t('labels.totalNonCirculatingSupply'),
    value: nonCirculatingSupply,
    total: maxSupply,
  });
  const circulatingSupplyRow = new Row({
    rank: 3,
    label: $t('labels.totalCirculatingSupply'),
    value: maxSupply - nonCirculatingSupply,
    total: maxSupply,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
  return [maxSupplyRow, nonCirculatingSupplyRow, circulatingSupplyRow];
};

const _getTotal = (maxSupply, nonCirculatingSupply) =>
  maxSupply - nonCirculatingSupply;
