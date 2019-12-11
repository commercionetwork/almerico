import randomDataGenerator from "Store/__mocks__/utils";

const mockProposal = (id = 1) => {
  let submit_time = randomDataGenerator.dateFromInterval(new Date(2019, 0, 2), new Date());
  let voting_start_time = randomDataGenerator.addDays(submit_time, 1);

  let total = randomDataGenerator.numberFromInterval(100000, 200000);
  let yes_percent = randomDataGenerator.numberFromInterval(0, 100);
  let yes = total / 100 * yes_percent;
  let no_percent = randomDataGenerator.numberFromInterval(0, (100 - yes_percent));
  let no = total / 100 * no_percent;
  let veto_percent = randomDataGenerator.numberFromInterval(0, (100 - yes_percent - no_percent));
  let no_with_veto = total / 100 * veto_percent;
  let abstain_percent = 100 - yes_percent - no_percent - veto_percent;
  let abstain = total / 100 * abstain_percent;
  let proposal_status = (yes_percent > 50) ? "Passed" : "Rejected";

  let item = {
    content: {
      type: "gov/TextProposal",
      value: {
        title: `Title #${id}`,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      }
    },
    id: `${id}`,
    proposal_status,
    final_tally_result: {
      yes,
      abstain,
      no,
      no_with_veto
    },
    submit_time,
    deposit_end_time: randomDataGenerator.addDays(submit_time, 14),
    total_deposit: [{
      denom: "ucommercio",
      amount: `${randomDataGenerator.numberFromInterval(100000000, 200000000)}`
    }],
    voting_start_time,
    voting_end_time: randomDataGenerator.addDays(voting_start_time, 14)
  };
  return item;
};

const mockProposals = (proposals = 5) => {
  let counter = 1;
  let list = new Array(proposals).fill(null).map(() => {
    return mockProposal(counter++);
  });
  return list;
};

const mockProposer = (id = 1) => {
  let item = {
    proposal_id: `${id}`,
    proposer: `comnet${randomDataGenerator.numberFromInterval(1, 9)}7d5g4e5q42k6e07klet4gpm0dxlja2mtjh9qfd`
  };
  return item;
};

const mockDeposit = (id = 1) => {
  let item = {
    depositor: `comnet${randomDataGenerator.numberFromInterval(1, 9)}7d5g4e5q42k6e07klet4gpm0dxlja2mtjh9qfd`,
    proposal_id: `${id}`,
    amount: [{
      denom: "ucommercio",
      amount: `${randomDataGenerator.numberFromInterval(100000000, 200000000)}`
    }]
  };
  return item;
};

const mockDeposits = (deposits = 5, id = 1) => {
  let list = new Array(deposits).fill(null).map(() => {
    return mockDeposit(id);
  });
  return list;
};

const answersList = ["Yes", "No", "NoWithVeto", "Abstain"];
const mockVote = (id = 1) => {
  let item = {
    voter: `comnet${randomDataGenerator.numberFromInterval(1, 9)}7d5g4e5q42k6e07klet4gpm0dxlja2mtjh9qfd`,
    proposal_id: `${id}`,
    option: randomDataGenerator.listValue(answersList)
  };
  return item;
};

const mockVotes = (votes = 20, id = 1) => {
  let list = new Array(votes).fill(null).map(() => {
    return mockDeposit(id);
  });
  return list;
};

export {
  mockDeposit,
  mockDeposits,
  mockProposal,
  mockProposals,
  mockProposer,
  mockVote,
  mockVotes
};
