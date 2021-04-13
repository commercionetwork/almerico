import { dateHandler } from '@/utils';

const mockRateUpdate = (
  rate = '1.000000000000000000',
  tms = '2000-01-01T00:00:00.000Z',
) => {
  const item = {
    height: '470',
    txhash: '88F2CE058A8C05CFF1BBE0ECDEC1CC25CEC38E6404B2F51B7608125E21CC8AAD',
    raw_log: `[{"msg_index":0,"log":"conversion rate changed successfully to ${rate}","events":[{"type":"message","attributes":[{"key":"action","value":"setEtpsConversionRate"},{"key":"sender","value":"did:com:19fe4e45jakkwcf7ysajf3zqekd982a66zl4a6u"}]},{"type":"new_conversion_rate","attributes":[{"key":"rate","value":${rate}}]}]}]`,
    logs: [
      {
        msg_index: 0,
        log: `conversion rate changed successfully to ${rate}`,
        events: [
          {
            type: 'message',
            attributes: [
              {
                key: 'action',
                value: 'setEtpsConversionRate',
              },
              {
                key: 'sender',
                value: 'did:com:19fe4e45jakkwcf7ysajf3zqekd982a66zl4a6u',
              },
            ],
          },
          {
            type: 'new_conversion_rate',
            attributes: [
              {
                key: 'rate',
                value: rate,
              },
            ],
          },
        ],
      },
    ],
    gas_wanted: '200000',
    gas_used: '56778',
    tx: {
      type: 'cosmos-sdk/StdTx',
      value: {
        msg: [
          {
            type: 'commercio/MsgSetCCCConversionRate',
            value: {
              signer: 'did:com:19fe4e45jakkwcf7ysajf3zqekd982a66zl4a6u',
              rate: `${rate}`,
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
        signatures: [
          {
            pub_key: {
              type: 'tendermint/PubKeySecp256k1',
              value: 'A9irAhAmueFHdWexvQk8r9MJvEmXc+2tIcOxn0pL8db0',
            },
            signature:
              'N9QQp0pkU9hn1J3KStHfkCMJKM6L8egoI98qN0zRUD1MkkMb3M+hcrdizvU5/AphkB/OB3c/N3J2fnk/7r/YwA==',
          },
        ],
        memo: '',
      },
    },
    timestamp: tms,
  };
  return item;
};

const mockRateUpdates = (
  { updates: updates, year: year, month: month, day: day } = {
    updates: 1,
    year: 2021,
    month: 1,
    day: 1,
  },
) => {
  let counter = day;
  const items = new Array(updates).fill(null).map(() => {
    const rate = Math.random().toFixed(18);
    const tms = dateHandler.getUtcDate(`${year}-${month}-${counter++}`);
    return mockRateUpdate(rate, tms);
  });
  return items;
};

export { mockRateUpdate, mockRateUpdates };
