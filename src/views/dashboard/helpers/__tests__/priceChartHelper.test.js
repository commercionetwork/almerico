import priceChartHelper from '../priceChartHelper';

describe('description', () => {
  test('description', () => {
    const all = priceChartHelper.getAllSortedListings({
      firstRate: mockFirstRate,
      rateUpdates: mockRateUpdates,
    });
    const listings = priceChartHelper.getListingsByRange({
      listings: all,
      range: 'today',
    });
  });
});

const mockFirstRate = {
  rate: '1.000000000000000000',
  date: '2021-05-28T11:37:05.016610373Z',
};
const mockRateUpdates = [
  {
    height: '209972',
    txhash: '6C286C0173916C043DA6D9FE481A2982587CE5D7FFC04E52F255BA04091A94A8',
    raw_log:
      '[{"msg_index":0,"log":"conversion rate changed successfully to 0.950000000000000000","events":[{"type":"message","attributes":[{"key":"action","value":"setEtpsConversionRate"},{"key":"sender","value":"did:com:18uh0dw0dcpn498wv6psuxl64hqqkevgec495zc"}]},{"type":"new_conversion_rate","attributes":[{"key":"rate","value":"0.950000000000000000"}]}]}]',
    logs: [
      {
        msg_index: 0,
        log: 'conversion rate changed successfully to 0.950000000000000000',
        events: [
          {
            type: 'message',
            attributes: [
              { key: 'action', value: 'setEtpsConversionRate' },
              {
                key: 'sender',
                value: 'did:com:18uh0dw0dcpn498wv6psuxl64hqqkevgec495zc',
              },
            ],
          },
          {
            type: 'new_conversion_rate',
            attributes: [{ key: 'rate', value: '0.950000000000000000' }],
          },
        ],
      },
    ],
    gas_wanted: '200000',
    gas_used: '56123',
    tx: {
      type: 'cosmos-sdk/StdTx',
      value: {
        msg: [
          {
            type: 'commercio/MsgSetCCCConversionRate',
            value: {
              signer: 'did:com:18uh0dw0dcpn498wv6psuxl64hqqkevgec495zc',
              rate: '0.950000000000000000',
            },
          },
        ],
        fee: {
          amount: [{ denom: 'ucommercio', amount: '10000' }],
          gas: '200000',
        },
        signatures: [
          {
            pub_key: {
              type: 'tendermint/PubKeySecp256k1',
              value: 'ArW+oReoLZ4eQNwCGQQnKSXfIAjwQBnIkuL8woH+y/Yi',
            },
            signature:
              'E8mgS4eD+JrS7lGVLK9kVcUvcGigsOkGLaRgQzD8sCYrKDsxGSFaus2VJiCLLTeTeoT4KoHksxAR2kcyQt5N5g==',
          },
        ],
        memo: '',
      },
    },
    timestamp: '2021-09-27T13:45:48Z',
  },
  {
    height: '209980',
    txhash: 'A14D019FCE9A226A5AF775F6FE8CB04889B1233C37AD1E99BBA3EA4957ACF53E',
    raw_log:
      '[{"msg_index":0,"log":"conversion rate changed successfully to 0.930000000000000000","events":[{"type":"message","attributes":[{"key":"action","value":"setEtpsConversionRate"},{"key":"sender","value":"did:com:18uh0dw0dcpn498wv6psuxl64hqqkevgec495zc"}]},{"type":"new_conversion_rate","attributes":[{"key":"rate","value":"0.930000000000000000"}]}]}]',
    logs: [
      {
        msg_index: 0,
        log: 'conversion rate changed successfully to 0.930000000000000000',
        events: [
          {
            type: 'message',
            attributes: [
              { key: 'action', value: 'setEtpsConversionRate' },
              {
                key: 'sender',
                value: 'did:com:18uh0dw0dcpn498wv6psuxl64hqqkevgec495zc',
              },
            ],
          },
          {
            type: 'new_conversion_rate',
            attributes: [{ key: 'rate', value: '0.930000000000000000' }],
          },
        ],
      },
    ],
    gas_wanted: '200000',
    gas_used: '56123',
    tx: {
      type: 'cosmos-sdk/StdTx',
      value: {
        msg: [
          {
            type: 'commercio/MsgSetCCCConversionRate',
            value: {
              signer: 'did:com:18uh0dw0dcpn498wv6psuxl64hqqkevgec495zc',
              rate: '0.930000000000000000',
            },
          },
        ],
        fee: {
          amount: [{ denom: 'ucommercio', amount: '10000' }],
          gas: '200000',
        },
        signatures: [
          {
            pub_key: {
              type: 'tendermint/PubKeySecp256k1',
              value: 'ArW+oReoLZ4eQNwCGQQnKSXfIAjwQBnIkuL8woH+y/Yi',
            },
            signature:
              'QTRlpOweRd4MytJdtZd1QYrWNeOATAKDeVxYy53t2wA+jomBrxtBkmJ6K4OJ2q2Srgxcof41C2epCGp3LO7NMA==',
          },
        ],
        memo: '',
      },
    },
    timestamp: '2021-09-27T13:46:32Z',
  },
  {
    height: '209987',
    txhash: 'C82E9B738A898827C217021854F064C247D6E4F35E296EAB5D34510935F795E9',
    raw_log:
      '[{"msg_index":0,"log":"conversion rate changed successfully to 0.960000000000000000","events":[{"type":"message","attributes":[{"key":"action","value":"setEtpsConversionRate"},{"key":"sender","value":"did:com:18uh0dw0dcpn498wv6psuxl64hqqkevgec495zc"}]},{"type":"new_conversion_rate","attributes":[{"key":"rate","value":"0.960000000000000000"}]}]}]',
    logs: [
      {
        msg_index: 0,
        log: 'conversion rate changed successfully to 0.960000000000000000',
        events: [
          {
            type: 'message',
            attributes: [
              { key: 'action', value: 'setEtpsConversionRate' },
              {
                key: 'sender',
                value: 'did:com:18uh0dw0dcpn498wv6psuxl64hqqkevgec495zc',
              },
            ],
          },
          {
            type: 'new_conversion_rate',
            attributes: [{ key: 'rate', value: '0.960000000000000000' }],
          },
        ],
      },
    ],
    gas_wanted: '200000',
    gas_used: '56123',
    tx: {
      type: 'cosmos-sdk/StdTx',
      value: {
        msg: [
          {
            type: 'commercio/MsgSetCCCConversionRate',
            value: {
              signer: 'did:com:18uh0dw0dcpn498wv6psuxl64hqqkevgec495zc',
              rate: '0.960000000000000000',
            },
          },
        ],
        fee: {
          amount: [{ denom: 'ucommercio', amount: '10000' }],
          gas: '200000',
        },
        signatures: [
          {
            pub_key: {
              type: 'tendermint/PubKeySecp256k1',
              value: 'ArW+oReoLZ4eQNwCGQQnKSXfIAjwQBnIkuL8woH+y/Yi',
            },
            signature:
              'AEPIe+iEZcRmLLo0ZJDdP6ccZeWo9sPge/G/ckTBWd9InZWIxk4HBBqjJ+7/GLXXd5Wn1L5gZOR6Ecfc/9Y4Gg==',
          },
        ],
        memo: '',
      },
    },
    timestamp: '2021-09-27T13:47:12Z',
  },
];
