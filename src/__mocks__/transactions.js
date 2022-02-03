import { v4 as uuidv4 } from 'uuid';

const mockTransaction = (height = '1') => {
  const item = {
    height,
    txhash: uuidv4(),
    codespace: '',
    code: 0,
    data: '0A060A0473656E64',
    raw_log:
      '[{"events":[{"type":"message","attributes":[{"key":"action","value":"send"},{"key":"sender","value":"did:com:19fe4e45jakkwcf7ysajf3zqekd982a66zl4a6u"},{"key":"module","value":"bank"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"did:com:1l8wqds8ff65x4r0ty8u7sua3v2xjje9mdqhzn6"},{"key":"sender","value":"did:com:19fe4e45jakkwcf7ysajf3zqekd982a66zl4a6u"},{"key":"amount","value":"10ucommercio"}]}]}]',
    logs: [
      {
        msg_index: 0,
        log: '',
        events: [
          {
            type: 'message',
            attributes: [
              {
                key: 'action',
                value: 'send',
              },
              {
                key: 'sender',
                value: 'did:com:19fe4e45jakkwcf7ysajf3zqekd982a66zl4a6u',
              },
              {
                key: 'module',
                value: 'bank',
              },
            ],
          },
          {
            type: 'transfer',
            attributes: [
              {
                key: 'recipient',
                value: 'did:com:1l8wqds8ff65x4r0ty8u7sua3v2xjje9mdqhzn6',
              },
              {
                key: 'sender',
                value: 'did:com:19fe4e45jakkwcf7ysajf3zqekd982a66zl4a6u',
              },
              {
                key: 'amount',
                value: '10ucommercio',
              },
            ],
          },
        ],
      },
    ],
    info: '',
    gas_wanted: '200000',
    gas_used: '62379',
    tx: {
      '@type': '/cosmos.tx.v1beta1.Tx',
      body: {
        messages: [
          {
            '@type': '/cosmos.bank.v1beta1.MsgSend',
            from_address: 'did:com:19fe4e45jakkwcf7ysajf3zqekd982a66zl4a6u',
            to_address: 'did:com:1l8wqds8ff65x4r0ty8u7sua3v2xjje9mdqhzn6',
            amount: [
              {
                denom: 'ucommercio',
                amount: '10',
              },
            ],
          },
        ],
        memo: '',
        timeout_height: '0',
        extension_options: [],
        non_critical_extension_options: [],
      },
      auth_info: {
        signer_infos: [
          {
            public_key: {
              '@type': '/cosmos.crypto.secp256k1.PubKey',
              key: 'A9irAhAmueFHdWexvQk8r9MJvEmXc+2tIcOxn0pL8db0',
            },
            mode_info: {
              single: {
                mode: 'SIGN_MODE_DIRECT',
              },
            },
            sequence: '79',
          },
        ],
        fee: {
          amount: [
            {
              denom: 'uccc',
              amount: '10000',
            },
          ],
          gas_limit: '200000',
          payer: '',
          granter: '',
        },
      },
      signatures: [
        '1CT/W9VF0mAzIRRdc4P2JD4+eKCdDr+C9ncxab1enpBeK9MLJ0EOwaD41fAX+e1n/lYrowlFQvJMcnOIb/NH7g==',
      ],
    },
    timestamp: '2021-10-19T14:05:42Z',
  };
  return item;
};

const mockTransactions = (txs = 10) => {
  let counter = 1;
  const list = new Array(txs)
    .fill(null)
    .map(() => mockTransaction(`${counter++}`));
  return list;
};

export {
  mockTransaction,
  mockTransactions,
  mockTransactionLegacy,
  mockTransactionsLegacy,
};

const mockTransactionsLegacy = (txs = 10) => {
  const list = new Array(txs).fill(null).map(() => mockTransactionLegacy());
  return list;
};

const mockTransactionLegacy = () => {
  const item = {
    height: '363',
    txhash: 'C676C4B03C64958A4ED5144FCCC4AB78EF5440CFB427C68F4503484AF67A97C9',
    data: '0A060A0473656E64',
    raw_log:
      '[{"events":[{"type":"message","attributes":[{"key":"action","value":"send"},{"key":"sender","value":"did:com:1nh557a0gmn0cwnrvefs7xll4986xsu27wnfzw2"},{"key":"module","value":"bank"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"did:com:1q7hszn4gtwdrpylldw32ex2p7cpd4qvj00yg8t"},{"key":"sender","value":"did:com:1nh557a0gmn0cwnrvefs7xll4986xsu27wnfzw2"},{"key":"amount","value":"10ucommercio"}]}]}]',
    logs: [
      {
        events: [
          {
            type: 'message',
            attributes: [
              {
                key: 'action',
                value: 'send',
              },
              {
                key: 'sender',
                value: 'did:com:1nh557a0gmn0cwnrvefs7xll4986xsu27wnfzw2',
              },
              {
                key: 'module',
                value: 'bank',
              },
            ],
          },
          {
            type: 'transfer',
            attributes: [
              {
                key: 'recipient',
                value: 'did:com:1q7hszn4gtwdrpylldw32ex2p7cpd4qvj00yg8t',
              },
              {
                key: 'sender',
                value: 'did:com:1nh557a0gmn0cwnrvefs7xll4986xsu27wnfzw2',
              },
              {
                key: 'amount',
                value: '10ucommercio',
              },
            ],
          },
        ],
      },
    ],
    gas_wanted: '200000',
    gas_used: '70216',
    tx: {
      type: 'cosmos-sdk/StdTx',
      value: {
        msg: [
          {
            type: 'cosmos-sdk/MsgSend',
            value: {
              from_address: 'did:com:1nh557a0gmn0cwnrvefs7xll4986xsu27wnfzw2',
              to_address: 'did:com:1q7hszn4gtwdrpylldw32ex2p7cpd4qvj00yg8t',
              amount: [
                {
                  denom: 'ucommercio',
                  amount: '10',
                },
              ],
            },
          },
        ],
        fee: {
          amount: [
            {
              denom: 'ucommercio',
              amount: '10000',
            },
          ],
          gas: '200000',
        },
        signatures: [],
        memo: '',
        timeout_height: '0',
      },
    },
    timestamp: '2021-11-04T09:59:09Z',
  };
  return item;
};
