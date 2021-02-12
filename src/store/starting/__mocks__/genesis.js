const mockGenesis = () => {
  const item = {
    genesis: {
      genesis_time: '2021-02-05T16:30:00Z',
      chain_id: 'commercio-testnet10k1',
      consensus_params: {
        block: {
          max_bytes: '22020096',
          max_gas: '-1',
          time_iota_ms: '1000',
        },
        evidence: {
          max_age_num_blocks: '500000',
          max_age_duration: '518400000000000',
        },
        validator: {
          pub_key_types: ['ed25519'],
        },
      },
      validators: [
        {
          address: '3E4FC2A7AFC75B3D0B73B1127B0C6D0D4E57E72C',
          pub_key: {
            type: 'tendermint/PubKeyEd25519',
            value: 'mpuhE1332he7cY7mIelHAk0RJwnmJ2HvHgQ/eeze/TU=',
          },
          power: '150000',
          name: 'adam',
        },
      ],
      app_hash: '',
      app_state: {}
    },
  };
  return item;
};

export { mockGenesis };
