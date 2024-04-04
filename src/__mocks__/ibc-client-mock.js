const mockIBCClient = () => {
  const item = {
    client_id: '07-tendermint-2',
    client_state: {
      '@type': '/ibc.lightclients.tendermint.v1.ClientState',
      chain_id: 'osmo-test-5',
      trust_level: {
        numerator: '1',
        denominator: '3',
      },
      trusting_period: '345600s',
      unbonding_period: '432000s',
      max_clock_drift: '40s',
      frozen_height: {
        revision_number: '0',
        revision_height: '0',
      },
      latest_height: {
        revision_number: '5',
        revision_height: '6156309',
      },
      proof_specs: [
        {
          leaf_spec: {
            hash: 'SHA256',
            prehash_key: 'NO_HASH',
            prehash_value: 'SHA256',
            length: 'VAR_PROTO',
            prefix: 'AA==',
          },
          inner_spec: {
            child_order: [0, 1],
            child_size: 33,
            min_prefix_length: 4,
            max_prefix_length: 12,
            empty_child: null,
            hash: 'SHA256',
          },
          max_depth: 0,
          min_depth: 0,
        },
        {
          leaf_spec: {
            hash: 'SHA256',
            prehash_key: 'NO_HASH',
            prehash_value: 'SHA256',
            length: 'VAR_PROTO',
            prefix: 'AA==',
          },
          inner_spec: {
            child_order: [0, 1],
            child_size: 32,
            min_prefix_length: 1,
            max_prefix_length: 1,
            empty_child: null,
            hash: 'SHA256',
          },
          max_depth: 0,
          min_depth: 0,
        },
      ],
      upgrade_path: ['upgrade', 'upgradedIBCState'],
      allow_update_after_expiry: true,
      allow_update_after_misbehaviour: true,
    },
  };
  return item;
};

const mockIBCClients = (clients = 2) => {
  const list = new Array(clients).fill(0).map(() => mockIBCClient());
  return list;
};

export { mockIBCClient, mockIBCClients };
