const mockValidatorSets = ({
  height = 1,
  address = 'did:com:valcons18e8u9fa0cadn6zmnkyf8krrdp4890eev8yxcpg',
  value = 'mpuhE1332he7cY7mIelHAk0RJwnmJ2HvHgQ/eeze/TU=',
} = {}) => {
  const item = {
    block_height: height + '',
    validators: [
      {
        address,
        pub_key: {
          type: 'tendermint/PubKeyEd25519',
          value,
        },
        proposer_priority: '0',
        voting_power: '100',
      },
    ],
  };
  return item;
};

export { mockValidatorSets };
