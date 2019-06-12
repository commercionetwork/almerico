import randomDataGenerator from "Store/__mocks__/utils";

const mockBlock = (time, height) => {
  let hash = randomDataGenerator.makeId(40);
  let txs = randomDataGenerator.intFromInterval(0, 7);
  let item = {
    header: {
      chain_id: "commercio.network",
      height,
      time,
      num_txs: txs,
      last_block_id: {
        hash: hash,
        parts: {
          total: 0,
          hash: hash
        }
      },
      total_txs: 35,
      last_commit_hash: hash,
      data_hash: hash,
      validators_hash: hash,
      next_validators_hash: hash,
      consensus_hash: hash,
      app_hash: hash,
      last_results_hash: hash,
      evidence_hash: hash,
      proposer_address: "comnet1depk54cuajgkzea6zpgkq36tnjwdzv4afc3d27",
      version: {
        block: 10,
        app: 0
      }
    },
    txs: [
      "string"
    ],
    evidence: [
      "string"
    ],
    last_commit: {
      block_id: {
        hash: hash,
        parts: {
          total: 0,
          hash: hash
        }
      },
      precommits: [{
        validator_address: "string",
        validator_index: "0",
        height: "0",
        round: "0",
        timestamp: "2018-11-01T00:00:00.000+02:00",
        type: 2,
        block_id: {
          hash: hash,
          parts: {
            total: 0,
            hash: hash
          }
        },
        signature: "7uTC74QlknqYWEwg7Vn6M8Om7FuZ0EO4bjvuj6rwH1mTUJrRuMMZvAAqT9VjNgP0RA/TDp6u/92AqrZfXJSpBQ=="
      }]
    }
  };
  return item;
};

const mockBlocks = (blocks = 10) => {
  let today = new Date(new Date() - (10000 * blocks));
  let time;
  let height = randomDataGenerator.intFromInterval(400000, 499999);
  let list = new Array(blocks).fill(null).map(() => {
    time = new Date(today.getTime() + randomDataGenerator.intFromInterval(1000, 9999));
    today = time;
    return mockBlock(time, height++);
  });
  return list;
};

export {
  mockBlock,
  mockBlocks
};
