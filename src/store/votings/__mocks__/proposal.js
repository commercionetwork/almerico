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
    proposal_id: id,
    title: "Join the commerc.io network",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    proposal_type: "gov/TextProposal",
    proposal_status,
    final_tally_result: {
      yes,
      abstain,
      no,
      no_with_veto
    },
    submit_time,
    total_deposit: [{
      denom: "stake",
      amount: "50"
    }],
    voting_start_time
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

export {
  mockProposal,
  mockProposals
};
