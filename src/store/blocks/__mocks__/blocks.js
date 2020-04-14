import randomDataGenerator from "Store/__mocks__/utils";

const mockBlock = (time, height) => {
  let hash = randomDataGenerator.makeId(40);
  let item = {
    header: {
      version: {
        block: "10",
        app: "0"
      },
      chain_id: "commercio-testnet7000",
      height: height,
      time: time,
      last_block_id: {
        hash: hash,
        parts: {
          total: "1",
          hash: hash
        }
      },
      last_commit_hash: hash,
      data_hash: "",
      validators_hash: hash,
      next_validators_hash: hash,
      consensus_hash: hash,
      app_hash: hash,
      last_results_hash: "",
      evidence_hash: "",
      proposer_address: "F9742047DD71D328A1264B1FB0F63252D41852BB"
    },
    data: {
      "txs": [
        "vQEoKBapCjBxWZ7oChQPRRseATU+wXVubFE16R6uY4kdZBIUFaB3UXTlwSHpK5y6v52lzr/K3ywSGQoTCgp1Y29tbWVyY2lvEgUxMDAwMBDAmgwaagom61rphyEDKoVUnke1cgwibBRFQmD36B8JAu+tMEsL8ag6fCwlnSkSQNRswfUXmhW7EpTw59RPa9/JUAmda9NwHOdX7s4OZTg6f/cy606dV1hGH+I2pdyYDNElOQyspRmzcizV0ri+9kc="
      ]
    },
    evidence: {
      evidence: null
    },
    last_commit: {
      height: "110572",
      round: "0",
      block_id: {
        hash: hash,
        parts: {
          total: "1",
          hash: hash
        }
      },
      signatures: [
        {
          block_id_flag: 2,
          validator_address: "09F700F953E99803FD4A134096A65E394800638D",
          timestamp: "2020-04-06T12:55:15.998356449Z",
          signature: "WmHJ5Ky0YFKUiI5JML3043OkVqYTSZg36NAUrYxIrCwqLFbwbM8UcLk3Hd7f22vM+Tvna3dY+gREY/ecPPKaCA=="
        },
        {
          block_id_flag: 2,
          validator_address: "485D2C4154DE89BAFCC37A49D55E67F77D19A76C",
          timestamp: "2020-04-06T12:55:16.000728908Z",
          signature: "8Hh747zZSgzbpZugpfPnSTagj7P0ClS6Z4WKiSKNfsT0Ih0cL48HxMe+n+ejEHOrswZOn+ocBOdQTA7Tb1DxBg=="
        },
        {
          block_id_flag: 2,
          validator_address: "C6FE3334D0146D252CF37A0660749740D48151E7",
          timestamp: "2020-04-06T12:55:16.003029046Z",
          signature: "pno5xfToL4NZMwFfNW+6KiWa6dFqTQw/wPaJL5BPSM1Y0yEE3wzqv8lVRV3V9tvhCMFK4N4UOGA+C0Z3blRkDQ=="
        },
        {
          block_id_flag: 2,
          validator_address: "CD03BBB06E0A3E9E42C8CBEBD9CAD2BDEC579582",
          timestamp: "2020-04-06T12:55:15.998788228Z",
          signature: "7YdpCQTNu9cc4g5CmZznTMmGfHXAN3a5XwDcUQVlniOGK5DS55kDjsyNT5cIxxgF8Qsp1LoOAQDGQ99CBAPQDQ=="
        },
        {
          block_id_flag: 2,
          validator_address: "F9742047DD71D328A1264B1FB0F63252D41852BB",
          timestamp: "2020-04-06T12:55:15.998379836Z",
          signature: "1Ko094eYo8FNbywaq+/0eH1vrRx//TALuVWeJJ8hsm9H/FaJ4exefXREBT7Pcj0ACsf14dq+jS5Vxb8sx+C/Dg=="
        }
      ]
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
