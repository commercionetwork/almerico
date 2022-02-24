import { dateHandler } from '@/utils';

const mockParamsUpdate = (
  rate = '1.000000000000000000',
  period = '1000000s',
  tms = '2000-01-01T00:00:00.000Z'
) => {
  const item = {
    height: '346',
    txhash: '5009E9DDF1ABA3E8C9697C295FAA57D5D4BF019AD4DEEE4C987E38F02E4E82FD',
    codespace: '',
    code: 0,
    data: '0A0B0A09736574506172616D73',
    raw_log:
      '[{"events":[{"type":"message","attributes":[{"key":"action","value":"setParams"}]},{"type":"new_freeze_period","attributes":[{"key":"new_params","value":"conversion_rate:\\"950000000000000000\\" freeze_period:\\u003cseconds:1181970 \\u003e "}]}]}]',
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
                value: 'setParams',
              },
            ],
          },
          {
            type: 'new_freeze_period',
            attributes: [
              {
                key: 'new_params',
                value:
                  'conversion_rate:"950000000000000000" freeze_period:<seconds:1181970 > ',
              },
            ],
          },
        ],
      },
    ],
    info: '',
    gas_wanted: '200000',
    gas_used: '60590',
    tx: {
      '@type': '/cosmos.tx.v1beta1.Tx',
      body: {
        messages: [
          {
            '@type':
              '/commercionetwork.commercionetwork.commerciomint.MsgSetParams',
            signer: 'did:com:1zg4jreq2g57s4efrl7wnh2swtrz3jt9nfaumcm',
            params: {
              conversion_rate: rate,
              freeze_period: period,
            },
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
              key: 'AozghctBHDjw+w1sHK5ghoTGQU1YH0tgCNNK24FC1dM0',
            },
            mode_info: {
              single: {
                mode: 'SIGN_MODE_DIRECT',
              },
            },
            sequence: '1',
          },
        ],
        fee: {
          amount: [
            {
              denom: 'ucommercio',
              amount: '10000',
            },
          ],
          gas_limit: '200000',
          payer: '',
          granter: '',
        },
      },
      signatures: [
        'had324WOH7IfXyK90qs/tMzbE+M89iV+RkCLIG0w9CYUPERrK/EAtfCJJKqvz0GjwcPpFoQ/YDv27LXb3p3I9Q==',
      ],
    },
    timestamp: tms,
  };
  return item;
};

const mockParamsUpdates = (
  { updates, year, month, day } = {
    updates: 1,
    year: 2021,
    month: 1,
    day: 1,
  }
) => {
  let counter = day;
  const items = new Array(updates).fill(null).map(() => {
    const rate = Math.random().toFixed(18).toString();
    const period = _getRandomInt(1, 100).toString();
    const tms = dateHandler.getUtcDate(`${year}/${month}/${counter++}`);
    return mockParamsUpdate(rate, period, tms);
  });
  return items;
};

export { mockParamsUpdate, mockParamsUpdates };

function _getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
