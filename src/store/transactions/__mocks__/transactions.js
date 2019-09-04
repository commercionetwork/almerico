import randomDataGenerator from "Store/__mocks__/utils";

const mockTransaction = (txhash = randomDataGenerator.makeId(40), height = randomDataGenerator.intFromInterval(400000, 499999)) => {
  let gas = `${randomDataGenerator.intFromInterval(100000, 199999)}/200.000`;
  let memo = randomDataGenerator.makeId(16);
  let amount = (randomDataGenerator.intFromInterval(100, 10000)) / 100;

  let item = {
    height,
    txhash,
    raw_log: [{
      msg_index: "0",
      success: true,
      log: ""
    }],
    logs: [{
      msg_index: "0",
      success: true,
      log: ""
    }],
    gas_wanted: "100000",
    gas_used: "10000",
    tags: [{
        key: "action",
        value: "send"
      },
      {
        key: "sender",
        value: "comnet1r7clpxcnxna5q7d6ux7dp9jqeu6rqv49rxuwh2"
      },
      {
        key: "recipient",
        value: "comnet1l0xuxycj63gqdcru06fhpr98v0lexnzzd5nxt2"
      }
    ],
    tx: {
      type: "auth/StdTx",
      value: {
        msg: [{
          type: "cosmos-sdk/MsgSend",
          value: {
            from_address: "comnet1r7clpxcnxna5q7d6ux7dp9jqeu6rqv49rxuwh2",
            to_address: "comnet1l0xuxycj63gqdcru06fhpr98v0lexnzzd5nxt2",
            amount: [{
              denom: "ucommercio",
              amount: "100000000"
            }]
          }
        }],
        fee: {
          amount: [{
            denom: "ucommercio",
            amount: "5000"
          }],
          gas: "200000"
        },
        signatures: [{
          pub_key: {
            type: "tendermint/PubKeySecp256k1",
            value: "Au3Y4Dipdd2sqRYje0d0QHiUTLKS7OvbVWYnQ1LYwEp9"
          },
          signature: "+kjExItp6m3/2NI6KsDp5pxQWsbwgZxdD2Lcl2CtuAE3+ImmbdcpTlfTwnYJuWLimG8FnqOJ3c/biWKSe5eNXw=="
        }],
        memo
      }
    },
    timestamp: "2019-06-14T07:05:38Z"
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
