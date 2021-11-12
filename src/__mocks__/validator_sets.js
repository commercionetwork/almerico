const mockValidatorSets = () => {
  const item = {
    block_height: '8198',
    validators: [
      {
        address: 'did:com:valcons1nl0m3tchdz56q5sr46kyan4zql37xdwg3c586e',
        pub_key: {
          type: 'tendermint/PubKeyEd25519',
          value: 'M096WOlaKj3fzov2FnpjMRgB1H90vyTxIgnDh6j86Yg=',
        },
        proposer_priority: '0',
        voting_power: '100',
      },
    ],
  };
  return item;
};

export { mockValidatorSets };
