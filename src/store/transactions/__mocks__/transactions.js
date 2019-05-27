import randomDataGenerator from "Store/__mocks__/utils";
const typeList = ["Send", "Delegate", "GetReward", "MultiSend"];

const mockTransaction = (id = 1, height, time) => {
  let item = {
    id,
    hash: randomDataGenerator.makeId(64),
    type: randomDataGenerator.listValue(typeList),
    result: "Success",
    fee: (randomDataGenerator.intFromInterval(1, 4999)) / 100000,
    height,
    time
  };
  return item;
};

const mockTransactions = (transactions = 10, height) => {
  let counter = 1;
  let hgt = (height) ?
    height :
    randomDataGenerator.intFromInterval(400000, 499999);
  let today = new Date(new Date() - (10000 * transactions));
  let time;
  let list = new Array(transactions).fill(null).map(() => {
    time = new Date(today.getTime() + randomDataGenerator.intFromInterval(1000, 9999));
    today = time;
    return mockTransaction(counter++, hgt++, time);
  });
  return list;
};

export {
  mockTransaction,
  mockTransactions
};
