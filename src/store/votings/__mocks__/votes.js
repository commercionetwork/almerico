import randomDataGenerator from "Store/__mocks__/utils";

const answersList = ["Yes", "No", "Veto", "Abstain"];

const mockVote = (id = 1, answer = "Abstain") => {
  let item = {
    id,
    answer,
    voter: {
      name: "commercio.network",
      address: "cosmos1fqzqejwkk898fcslw4z4eeqjzesynvrdvhqz82",
      pub_key: "cosmosvaloper1fqzqejwkk898fcslw4z4eeqjzesynvrdfr5hte",
    },
    tx_hash: randomDataGenerator.makeId(64),
    date: randomDataGenerator.dateFromInterval(new Date(2019, 0, 2), new Date())
  };
  return item;
};

const mockVotes = (votes = 25) => {
  let counter = 1;
  let list = new Array(votes).fill(null).map(() => {
    return mockVote(counter++, randomDataGenerator.listValue(answersList));
  });
  return list;
};

export {
  mockVote,
  mockVotes
};
