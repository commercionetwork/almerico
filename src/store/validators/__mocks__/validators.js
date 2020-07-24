import randomDataGenerator from "Store/__mocks__/utils";

const mockValidator = (jailed = false, status = 2) => {
  let rate = (randomDataGenerator.intFromInterval(500, 1500) / 100).toFixed(18);

  let item = {
    operator_address: "comnetvaloper16xyempempp92x9hyzz9wrgf94r6j9h5f2w4n2l",
    consensus_pubkey: "comnetvalconspub1zcjduepq0vu2zgkgk49efa0nqwzndanq5m4c7pa3u4apz4g2r9gspqg6g9cs3k9cuf",
    jailed,
    status,
    tokens: "100000000000",
    delegator_shares: "100000000000.000000000000000000",
    description: {
      moniker: "moniker",
      identity: "identity",
      website: "website",
      details: "details"
    },
    unbonding_height: "0",
    unbonding_time: "1970-01-01T00:00:00Z",
    commission: {
      commission_rates: {
        rate: rate.toString(),
        max_rate: (rate * 2).toString(),
        max_change_rate: (rate / 10).toString()
      },
      update_time: "2019-01-02T00:00:00Z"
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

const mockValidatorSet = (set = 10) => {
  const item = {
    address: "did:com:valcons1x8mj58trfal3wmsckppul0ahrlnm3fa07fc4ce",
    pub_key: "did:com:valconspub1zcjduepqkk8pwgsm40cseee2p83m4rwp0l5dkmuc2hw2xpy6dmsjdtf2xg4shfpjn2",
    proposer_priority: "225851",
    voting_power: "100000"
  };

  let list = new Array(set).fill(null).map(() => {
    return item;
  });

  return list;
};

export {
  mockValidator,
  mockValidators,
  mockValidatorSet
};
