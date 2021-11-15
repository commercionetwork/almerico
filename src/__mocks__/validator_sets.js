const mockValidatorSets = (height = '1') => {
  const item = {
    block_height: height,
    validators: [
      {
        address: 'did:com:valcons1hdd9sjn8z09zezc2rx2pp2lqn3h45x8sjaktwe',
        pub_key: {
          type: 'tendermint/PubKeyEd25519',
          value: 'ET6Pifwl3+X/XCHaThqJLGG7MSX9ybXZNPLvxgIehCg=',
        },
        proposer_priority: '0',
        voting_power: '100',
      },
    ],
  };
  return item;
};

export { mockValidatorSets };
