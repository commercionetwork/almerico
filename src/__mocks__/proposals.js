const mockProposal = (id = '1') => {
  const item = {
    proposal_id: id,
    content: {
      '@type': '/cosmos.params.v1beta1.ParameterChangeProposal',
      title: 'Wasm Param Change',
      description: 'Update max bytes code',
      changes: [
        {
          subspace: 'wasm',
          key: 'maxWasmCodeSize',
          value: '"10485760"',
        },
      ],
    },
    status: 'PROPOSAL_STATUS_PASSED',
    final_tally_result: {
      yes: '500115990000',
      abstain: '0',
      no: '0',
      no_with_veto: '0',
    },
    submit_time: '2022-03-28T14:59:22.318662562Z',
    deposit_end_time: '2022-03-30T14:59:22.318662562Z',
    total_deposit: [
      {
        denom: 'ucommercio',
        amount: '50000000000',
      },
    ],
    voting_start_time: '2022-03-28T14:59:22.318662562Z',
    voting_end_time: '2022-03-30T14:59:22.318662562Z',
  };

  return item;
};

const mockProposals = (proposals = 5) => {
  let counter = 1;
  const list = new Array(proposals)
    .fill(null)
    .map(() => mockProposal(`${counter++}`));
  return list;
};

const mockTally = () => {
  const item = {
    yes: '500115990000',
    abstain: '0',
    no: '0',
    no_with_veto: '0',
  };
  return item;
};

const mockVote = (id = 1) => {
  const item = {
    id,
  };
  return item;
};

const mockVotes = (votes = 10) => {
  let counter = 1;
  const list = new Array(votes).fill(null).map(() => mockVote(counter++));
  return list;
};

export { mockProposal, mockProposals, mockTally, mockVotes };
