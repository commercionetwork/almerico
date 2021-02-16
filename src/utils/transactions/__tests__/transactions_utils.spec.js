import TransactionDetailsAdapter from '../TransactionDetailsAdapter';
import { mockTx } from '../../../store/transactions/__mocks__/txs';

describe('utils/transactions', () => {
  test("if 'TransactionDetailsAdapter' class returns the adapted transactions", () => {
    const details = {
      data: mockTx(),
      ledger: 'https://lcd.commercio.network',
      version: '',
    };
    const tx = TransactionDetailsAdapter.setDetails(details).get();

    const expectedKeys = [
      'hash',
      'time',
      'status',
      'rawLog',
      'fee',
      'gas',
      'height',
      'type',
      'msgs',
      'ledger',
      'version',
    ];

    expect(Object.keys(tx)).toStrictEqual(expectedKeys);
  });
});
