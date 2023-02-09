import { APIS } from '@/constants';
import { mockTransactions } from '@/__mocks__';
import txHandler from '../txHandler';
import txsFilter from '../txsFilter';
import txsTableAdapter from '../txsTableAdapter';

describe('utils/txs', () => {
  test('if "txsFilter.filter" method return filtered transactions', () => {
    const txs = mockTransactions();
    const filter = 'send';

    const filterdTxs = txsFilter.filter(txs, filter);
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

  test('if "txsTableAdapter.build" method return an array of wanted table rows', () => {
    const items = 10;
    const txs = mockTransactions(items);
    const labels = {
      multiTypes: 'multiTypes',
      multiValues: 'multiValues',
    };
    const type = 'send';
    const convertedTxs = txsTableAdapter.build({ txs, labels, type });

    const expectedKeys = [
      'height',
      'type',
      'msgs',
      'result',
      'fee',
      'hash',
      'date',
      'time',
      'timestamp',
    ];

    expect(convertedTxs.length).toBe(items);
    for (const tx of convertedTxs) {
      expect(Object.keys(tx)).toStrictEqual(expectedKeys);
    }
  });

  test('if function "txHandler.getType_current" return an empty string', () => {
    const msgs = [];
    const multiTypes = 'Multi Types';

    const type = txHandler.getType_current(msgs, multiTypes);

    expect(type).toBe('');
  });

  test('if function "txHandler.getType_current" return the message type', () => {
    const msgs = [
      {
        '@type': `/cosmos.bank.${APIS.HTTP.API_VERSION}.MsgSend`,
      },
    ];
    const multiTypes = 'Multi Types';

    const type = txHandler.getType_current(msgs, multiTypes);

    expect(type).toBe('MsgSend');
  });

  test('if function "txHandler.getType_current" return the "Multi Types" string', () => {
    const msgs = [
      {
        '@type': `/cosmos.bank.${APIS.HTTP.API_VERSION}.MsgSend`,
      },
      {
        '@type': `/cosmos.bank.${APIS.HTTP.API_VERSION}.MsgSend`,
      },
    ];
    const multiTypes = 'Multi Types';

    const type = txHandler.getType_current(msgs, multiTypes);

    expect(type).toBe(multiTypes);
  });
});
