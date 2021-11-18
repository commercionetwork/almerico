import { dateHandler } from '@/utils';

const mockRateUpdate = (
  rate = '1.000000000000000000',
  tms = '2000-01-01T00:00:00.000Z',
) => {
  const item = {
    height: '1825',
    txhash: '372999F3B77662743BF1DC7DC3A54015D567CE193A038B2FBC2C6E02303E0D4F',
    codespace: '',
    code: 0,
    data: '0A2D0A1573657445747073436F6E76657273696F6E5261746512140A12393530303030303030303030303030303030',
    raw_log: `[{"events":[{"type":"message","attributes":[{"key":"action","value":"setEtpsConversionRate"}]},{"type":"new_conversion_rate","attributes":[{"key":"rate","value":${rate}}]}]}]`,
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
                value: 'setEtpsConversionRate',
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
    info: '',
    gas_wanted: '200000',
    gas_used: '55080',
    tx: {
      '@type': '/cosmos.tx.v1beta1.Tx',
      body: {
        messages: [
          {
            '@type':
              '/commercionetwork.commercionetwork.commerciomint.MsgSetCCCConversionRate',
            signer: 'did:com:1zg4jreq2g57s4efrl7wnh2swtrz3jt9nfaumcm',
            rate: rate,
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
            sequence: '2',
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
        'oaCXIKZuu2FOMFRlQRVHuSQJlPF71D8vEImmggCR4uVlSq+Vl5gHauMOJ3ThVe+RhmTVgh2k2q1Ch/H7ry2Yzg==',
      ],
    },
    timestamp: tms,
  };
  return item;
};

const mockRateUpdates = (
  { updates, year, month, day } = {
    updates: 1,
    year: 2021,
    month: 1,
    day: 1,
  },
) => {
  let counter = day;
  const items = new Array(updates).fill(null).map(() => {
    const rate = Math.random().toFixed(18);
    const tms = dateHandler.getUtcDate(`${year}/${month}/${counter++}`);
    return mockRateUpdate(rate, tms);
  });
  return items;
};

export { mockRateUpdate, mockRateUpdates };
