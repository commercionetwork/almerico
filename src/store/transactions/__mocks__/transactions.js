import randomDataGenerator from "Store/__mocks__/utils";

const mockTransaction = (txhash = randomDataGenerator.makeId(40), height = randomDataGenerator.intFromInterval(400000, 499999)) => {
  let gas = `${randomDataGenerator.intFromInterval(100000, 199999)}/200.000`;
  let memo = randomDataGenerator.makeId(16);
  let amount = (randomDataGenerator.intFromInterval(100, 10000)) / 100;

  let item = {
    txhash,
    height,
    tx: {
      msg: [
        "string"
      ],
      fee: {
        gas,
        amount: [{
          denom: "stake",
          amount
        }]
      },
      memo,
      signature: {
        signature: "MEUCIQD02fsDPra8MtbRsyB1w7bqTM55Wu138zQbFcWx4+CFyAIge5WNPfKIuvzBZ69MyqHsqD8S1IwiEp+iUb6VSdtlpgY=",
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: "Avz04VhtKJh8ACCVzlI8aTosGy0ikFXKIVHQ3jKMrosH"
        },
        account_number: "0",
        sequence: "0"
      }
    },
    result: {
      log: "string",
      gas_wanted: "200000",
      gas_used: "26354",
      tags: [{
        key: "string",
        value: "string"
      }]
    }
  };
  return item;
};

const mockTransactions = (transactions = 10, height) => {
  let hgt = (height) ?
    height :
    randomDataGenerator.intFromInterval(400000, 499999);
  let today = new Date(new Date() - (10000 * transactions));
  let time;
  let list = new Array(transactions).fill(null).map(() => {
    time = new Date(today.getTime() + randomDataGenerator.intFromInterval(1000, 9999));
    today = time;
    return mockTransaction(randomDataGenerator.makeId(40), (height) ? hgt : hgt++);
  });
  return list;
};

export {
  mockTransaction,
  mockTransactions
};
