import { numberIntlFormatter } from '@/utils';
import circulatingTableBuilder from '../circulating-table-builder/index';

describe('views/exchange-rate/helpers/circulating-table-builder', () => {
  test('if "build" method return data to be used by circulating table', async () => {
    numberIntlFormatter.toDecimal = jest.fn().mockReturnValue('1');
    numberIntlFormatter.toPercent = jest.fn().mockReturnValue('1.00 %');

    const res = await circulatingTableBuilder.build({
      maxSupply: 2,
      totalNonCirculatingSupply: 1,
    });

    expect(res.tableData.length).toBe(3);
    expect(res.headers.length).toBe(3);
    expect(res.totalCirculatingSupply).toBeDefined();
  });
});
