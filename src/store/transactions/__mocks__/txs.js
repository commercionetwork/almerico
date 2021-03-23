const mockTx = () => {
  const item = {
    height: '108869',
    txhash: '75D52DBA9EACA1387456B608905F53A2DFC21A66D6A3A8177C870F608A648810',
    raw_log:
      '[{"msg_index":0,"log":"","events":[{"type":"message","attributes":[{"key":"action","value":"send"},{"key":"sender","value":"did:com:15ypwpf8dzjtakr350n0s2vlh7zc8j82vhpfxar"},{"key":"module","value":"bank"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"did:com:1eycqresu4xl6dzy9zell7mp3amg40x9trjavr3"},{"key":"sender","value":"did:com:15ypwpf8dzjtakr350n0s2vlh7zc8j82vhpfxar"},{"key":"amount","value":"30000ucommercio"}]}]}]',
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
                value: 'did:com:15ypwpf8dzjtakr350n0s2vlh7zc8j82vhpfxar',
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
                value: 'did:com:1eycqresu4xl6dzy9zell7mp3amg40x9trjavr3',
              },
              {
                key: 'sender',
                value: 'did:com:15ypwpf8dzjtakr350n0s2vlh7zc8j82vhpfxar',
              },
              {
                key: 'amount',
                value: '30000ucommercio',
              },
            ],
          },
        ],
      },
    ],
    gas_wanted: '200000',
    gas_used: '69510',
    tx: {
      type: 'cosmos-sdk/StdTx',
      value: {
        msg: [
          {
            type: 'cosmos-sdk/MsgSend',
            value: {
              from_address: 'did:com:15ypwpf8dzjtakr350n0s2vlh7zc8j82vhpfxar',
              to_address: 'did:com:1eycqresu4xl6dzy9zell7mp3amg40x9trjavr3',
              amount: [
                {
                  denom: 'ucommercio',
                  amount: '30000',
                },
              ],
            },
          },
        ],
        fee: {
          amount: [
            {
              denom: 'ucommercio',
              amount: '30000',
            },
          ],
          gas: '200000',
        },
        signatures: [
          {
            pub_key: {
              type: 'tendermint/PubKeySecp256k1',
              value: 'A3bkgzSfIsGMG6zyHecjXpJZRYCOXrBBBG8hpoeiYEjQ',
            },
            signature:
              '5eAL4HL1LQWoNOBOX9uU68lMVN33P4IPAD109fEv0tBDwkt91yS3Y9Fbo2+q8UqFs6VCpzPO196UVJJL7KDpWg==',
          },
        ],
        memo: '',
      },
    },
    timestamp: '2021-02-12T11:55:38Z',
  };
  return item;
};

const mockTxs = (txs = 10) => {
  const list = new Array(txs).fill(null).map(() => mockTx());
  return list;
};

export { mockTx, mockTxs };
