const mockValidatorSets = () => {
  const item = {
    block_height: '156611',
    validators: [
      {
        address: 'did:com:valcons1xfde5tgdrrxgggp2usl2hrvcae6jrgmrhsuw3g',
        pub_key:
          'did:com:valconspub1zcjduepqdrlhkfvnvan5klxkt05cn4snc425cawgd67kj0qttzcac9mwp36s2x97rt',
        proposer_priority: '-161971',
        voting_power: '150050',
      },
      {
        address: 'did:com:valcons18e8u9fa0cadn6zmnkyf8krrdp4890eev8yxcpg',
        pub_key:
          'did:com:valconspub1zcjduepqn2d6zy6a7ldp0wm33mnzr628qfx3zfcfucnkrmc7qslhnmx7l56secvyvw',
        proposer_priority: '-94473',
        voting_power: '150060',
      },
      {
        address: 'did:com:valcons143ag9wm5f98mdcn9z3fjqjnlx9t5fewqwcdelw',
        pub_key:
          'did:com:valconspub1zcjduepqcyu0txsvcd2sldvultf8d8amkhhlu4cka7j6ufp6heecqm33gr3qapenrv',
        proposer_priority: '176601',
        voting_power: '150137',
      },
      {
        address: 'did:com:valcons1c0vek458dky86lu3h9cuud2ja09ev2p7m90rmp',
        pub_key:
          'did:com:valconspub1zcjduepql0f5w2h8t7f57lp56ky2uvum7n6gk4nc58fjzp07nc7n80uv8gdsrhmyp2',
        proposer_priority: '79843',
        voting_power: '150025',
      },
    ],
  };
  return item;
};

export { mockValidatorSets };
