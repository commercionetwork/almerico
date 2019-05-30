import randomDataGenerator from "Store/__mocks__/utils";

const labelsList = ["Available", "Delegated", "Reward", "Unbonding"];

let total = randomDataGenerator.numberFromInterval(1, 999999);
let available_percent = randomDataGenerator.numberFromInterval(0, 100);
let available = total / 100 * available_percent;
let delegated_percent = randomDataGenerator.numberFromInterval(0, (100 - available_percent));
let delegated = total / 100 * delegated_percent;
let reward_percent = randomDataGenerator.numberFromInterval(0, (100 - available_percent - delegated_percent));
let reward = total / 100 * reward_percent;
let unbonding_percent = 100 - available_percent - delegated_percent - reward_percent;
let unbonding = total / 100 * unbonding_percent;

const mockAccount = (id = 1) => {
  let item = {
    id,
    name: "commercio.network",
    address: "cosmos1fqzqejwkk898fcslw4z4eeqjzesynvrdvhqz82",
    pub_key: "cosmosvaloper1fqzqejwkk898fcslw4z4eeqjzesynvrdfr5hte",
    atoms: {
      total: randomDataGenerator.numberFromInterval(1, 999999),
      value: randomDataGenerator.numberFromInterval(1, 9),
      partition: [{
          label: labelsList[0],
          count: available,
          percent: available_percent
        },
        {
          label: labelsList[1],
          count: delegated,
          percent: delegated_percent
        },
        {
          label: labelsList[2],
          count: reward,
          percent: reward_percent
        },
        {
          label: labelsList[3],
          count: unbonding,
          percent: unbonding_percent
        },
      ]
    }
  };
  return item;
};

export {
  mockAccount
};
