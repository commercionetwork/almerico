import { mockTx, mockTxs } from '../../../store/transactions/__mocks__/txs';
import TransactionDetailsAdapter from '../TransactionDetailsAdapter';
import transactionsFilter from '../txsFilter';
import transactionsTableAdapter from '../txsTableAdapter';

describe('utils/transactions', () => {
  test("if 'TransactionDetailsAdapter' class returns the adapted transaction", () => {
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

  test("if 'transactionsFilter.filter' method return filtered transactions", () => {
    const txs = mockTxs();
    const filter = 'send';

    const filterdTxs = transactionsFilter.filter(txs, filter);
    for (const tx of filterdTxs) {
      const logs = tx.logs;
      for (const log of logs) {
        const events = log.events;
        for (const event of events) {
          if (event.type === 'message') {
            const attributes = event.attributes;
            for (const attribute of attributes) {
              if (attribute.key === 'action') {
                expect(attribute.value).toBe(filter);
              }
            }
          } else {
            return;
          }
        }
      }
    }
  });

  test("if 'transactionsTableAdapter.build' method return an array of wanted transactions", () => {
    const items = 10;
    const txs = mockTxs(items);
    const filter = 'send';
    const convertedTxs = transactionsTableAdapter.build(txs, filter);

    const expectedKeys = [
      'height',
      'type',
      'msgs',
      'result',
      'fee',
      'hash',
      'date',
      'time',
    ];

    expect(convertedTxs.length).toBe(items);
    for (const tx of convertedTxs) {
      expect(Object.keys(tx)).toStrictEqual(expectedKeys);
    }
  });
});
