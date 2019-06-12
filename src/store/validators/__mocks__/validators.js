import randomDataGenerator from "Store/__mocks__/utils";

const mockValidator = () => {
  let rate = (randomDataGenerator.intFromInterval(100, 5000) / 100).toFixed(2);

  let item = {
    operator_address: "comnetvaloper16xyempempp92x9hyzz9wrgf94r6j9h5f2w4n2l",
    consensus_pubkey: "comnetvalconspub1zcjduepq0vu2zgkgk49efa0nqwzndanq5m4c7pa3u4apz4g2r9gspqg6g9cs3k9cuf",
    jailed: true,
    status: 0,
    tokens: "string",
    delegator_shares: "string",
    description: {
      moniker: "string",
      identity: "string",
      website: "string",
      details: "string"
    },
    bond_height: "0",
    bond_intra_tx_counter: 0,
    unbonding_height: "0",
    unbonding_time: "1970-01-01T00:00:00Z",
    commission: {
      rate,
      max_rate: "0",
      max_change_rate: "0",
      update_time: "1970-01-01T00:00:00Z"
    }
  };
  return item;
};

const mockValidators = (validators = 10) => {
  let list = new Array(validators).fill(null).map(() => {
    return mockValidator();
  });
  return list;
};

export {
  mockValidator,
  mockValidators
};
