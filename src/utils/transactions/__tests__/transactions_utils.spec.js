import { mockTx, mockTxs } from '../../../store/transactions/__mocks__/txs';
import TransactionDetailsAdapter from '../TransactionDetailsAdapter';
import TransactionsFilter from '../TransactionsFilter';
import TransactionsTableAdapter from '../TransactionsTableAdapter';

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

  test("if 'TransactionsFilter' class filter transactions", () => {
    const txs = mockTxs();
    const filter = 'send';

    const filterdTxs = TransactionsFilter.setTxs(txs)
      .setFilter(filter)
      .get();
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

  test("if 'TransactionsTableAdapter' class returns an array of wanted transactions", () => {
    const items = 10;
    const txs = mockTxs(items);
    const multiTypes = 'Multi types';
    const filter = 'send';
    const convertedTxs = TransactionsTableAdapter.setTxs(txs)
      .setMultiTypes(multiTypes)
      .setFilter(filter)
      .get();

    const expectedKeys = [
      'height',
      'type',
      'msgs',
      'result',
      'fee',
      'hash',
      'date',
    ];

    expect(convertedTxs.length).toBe(items);
    for (const tx of convertedTxs) {
      expect(Object.keys(tx)).toStrictEqual(expectedKeys);
    }
  });
});
