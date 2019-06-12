import randomDataGenerator from "Store/__mocks__/utils";

const mockBlock = (id = 1, time, height) => {
  let item = {
    id,
    time,
    height,
    hash: randomDataGenerator.makeId(64),
    transactions: randomDataGenerator.intFromInterval(0, 5),
    proposer: {
      name: "commerc.io network",
      pub_key: "cosmosvaloper1fqzqejwkk898fcslw4z4eeqjzesynvrdfr5hte",
    }
  };
  return item;
};

const mockBlocks = (blocks = 10) => {
  let counter = 1;
  let today = new Date (new Date() - (10000 * blocks));
  let time;
  let height = randomDataGenerator.intFromInterval(400000, 499999);
  let list = new Array(blocks).fill(null).map(() => {
    time = new Date(today.getTime() + randomDataGenerator.intFromInterval(1000, 9999));
    today = time;
    return mockBlock(counter++, time, height++);
  });
  return list;
};

export {
  mockBlock,
  mockBlocks
};
