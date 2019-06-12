import randomDataGenerator from "Store/__mocks__/utils";

const mockValidator = (id = 1) => {
  let power = randomDataGenerator.intFromInterval(5000000, 9999999);
  let delegated = randomDataGenerator.intFromInterval(1000000, power);
  let rank = id;
  let item = {
    id,
    name: "commercio.network",
    description: "Documents Blockchain",
    site: "https://commercio.network/",
    address: "cosmos1fqzqejwkk898fcslw4z4eeqjzesynvrdvhqz82",
    pub_key: "cosmosvaloper1fqzqejwkk898fcslw4z4eeqjzesynvrdfr5hte",
    status: "Active",
    rank,
    voting: {
      power,
      power_percent: (randomDataGenerator.intFromInterval(10, 999) / 100).toFixed(2),
      delegated,
      delegated_percent: ((delegated * 100) / power).toFixed(2)
    },
    share: (randomDataGenerator.intFromInterval(100, 9999) / 100).toFixed(2),
    delegators: randomDataGenerator.intFromInterval(1,19),
    commission: (randomDataGenerator.intFromInterval(100, 5000) / 100).toFixed(2),
    uptime: (randomDataGenerator.intFromInterval(9000, 9999) / 100).toFixed(2),
  };
  return item;
};

const mockValidators = (validators = 10) => {
  let counter = 1;
  let list = new Array(validators).fill(null).map(() => {
    return mockValidator(counter++);
  });
  return list;
};

export {
  mockValidator,
  mockValidators
};
