import randomDataGenerator from "Store/__mocks__/utils";

const mockVoting = (id = 1) => {
  let submit_date = randomDataGenerator.dateFromInterval(new Date(2019, 0, 2), new Date());
  let deposit_end_date = randomDataGenerator.addDays(submit_date, 14);
  let start_date = randomDataGenerator.addDays(submit_date, 1);
  let end_date = randomDataGenerator.addDays(start_date, 14);

  let total = randomDataGenerator.intFromInterval(100000, 200000);
  let yes_percent = randomDataGenerator.numberFromInterval(0, 100);
  let yes = total / 100 * yes_percent;
  let no_percent = randomDataGenerator.numberFromInterval(0, (100 - yes_percent));
  let no = total / 100 * no_percent;
  let veto_percent = randomDataGenerator.numberFromInterval(0, (100 - yes_percent - no_percent));
  let veto = total / 100 * veto_percent;
  let abstain_percent = 100 - yes_percent - no_percent - veto_percent;
  let abstain = total / 100 * abstain_percent;
  let status = (yes_percent > 50) ? "Passed" : "Rejected";

  let item = {
    id,
    hashtag: "#" + id,
    title: "Join the commerc.io network",
    proposer: "commercio.network",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "gov/TextProposal",
    status,
    dates: {
      submit: submit_date,
      deposit_end: deposit_end_date,
      start: start_date,
      end: end_date
    },
    poll: {
      quorum: (randomDataGenerator.numberFromInterval(5001, 9999) / 100).toFixed(2),
      total,
      votes: [{
          label: "Yes",
          count: yes,
          percent: yes_percent.toFixed(2)
        },
        {
          label: "No",
          count: no,
          percent: no_percent.toFixed(2)
        },
        {
          label: "Veto",
          count: veto,
          percent: veto_percent.toFixed(2)
        },
        {
          label: "Abstain",
          count: abstain,
          percent: abstain_percent.toFixed(2)
        }
      ]
    }
  };
  return item;
};

const mockVotings = (votings = 5) => {
  let counter = 1;
  let list = new Array(votings).fill(null).map(() => {
    return mockVoting(counter++);
  });
  return list;
};

export {
  mockVoting,
  mockVotings
};
