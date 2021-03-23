const mockBlock = (height = '1') => {
  const item = {
    block_id: {
      hash: '3FC061B8543DA3ADF78B8BC34D5CDAF3511F212F5D11419E9E7B39CAC1EE8FF6',
      parts: {
        total: '1',
        hash:
          '4B1C7AE65B0B7F0872D0A99042042C5B012731631FB7E3387FFA776E9FA7C594',
      },
    },
    block: {
      header: {
        version: {
          block: '10',
          app: '0',
        },
        chain_id: 'commercio-testnet10k1',
        height: height,
        time: '2021-02-16T13:58:40.691559082Z',
        last_block_id: {
          hash:
            'BF2FDF013A0919080F55E8AEFD6D846B61F17EA09E2D1791139E4EB1D8B524DC',
          parts: {
            total: '1',
            hash:
              '8EE4C9C6C7984B680A792CBD079382A78DFA8799975A5EC82EA308C42261F490',
          },
        },
        last_commit_hash:
          '7CF8A288E9C862C0E2992F0C66300E591CA1C450244809297A7494D542F5B1B3',
        data_hash: '',
        validators_hash:
          'FA968B53E4DBB685940517D1F4C7EEC0ABBB23DA5F0BAA655AC0F398AAB0FE46',
        next_validators_hash:
          'FA968B53E4DBB685940517D1F4C7EEC0ABBB23DA5F0BAA655AC0F398AAB0FE46',
        consensus_hash:
          '048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F',
        app_hash:
          'EBAF9C11F9B9F31664091254DA9C2DD13EC3F27D1AB207DF08330671E13884A8',
        last_results_hash: '',
        evidence_hash: '',
        proposer_address: '3E4FC2A7AFC75B3D0B73B1127B0C6D0D4E57E72C',
      },
      data: {
        txs: null,
      },
      evidence: {
        evidence: null,
      },
      last_commit: {
        height: '174858',
        round: '0',
        block_id: {
          hash:
            'BF2FDF013A0919080F55E8AEFD6D846B61F17EA09E2D1791139E4EB1D8B524DC',
          parts: {
            total: '1',
            hash:
              '8EE4C9C6C7984B680A792CBD079382A78DFA8799975A5EC82EA308C42261F490',
          },
        },
        signatures: [
          {
            block_id_flag: 2,
            validator_address: '2820613DDEA5ABDEA31FA3865C6FB6691C460D74',
            timestamp: '2021-02-16T13:58:40.70601615Z',
            signature:
              'ppXwPB1wFwigzcvW5qbNtVP8+VEfThoVLrrkJtFHh75bx3hA8IMsb+8M9We0ug2kEkFm389664yRK+q2Zi01DA==',
          },
          {
            block_id_flag: 2,
            validator_address: '325B9A2D0D18CC84202AE43EAB8D98EE7521A363',
            timestamp: '2021-02-16T13:58:40.683190068Z',
            signature:
              'ATqmKjCPFYfCRBP9ohpwSbNTViqkTF+zSgLHfp46Vux1PuUv3cRFGseuNipuzaoXqcisf0Zv2qajWLBSVSScAg==',
          },
          {
            block_id_flag: 2,
            validator_address: '3E4FC2A7AFC75B3D0B73B1127B0C6D0D4E57E72C',
            timestamp: '2021-02-16T13:58:40.685148019Z',
            signature:
              'ijFiaVb5i44hFhj4WQNrk6iSAfMN1IwN6wo7ajH51jZ55WcV346Yhu762WJyRcsIt6PAq5OG+l8clHpZgkvBAg==',
          },
          {
            block_id_flag: 2,
            validator_address: 'AC7A82BB74494FB6E2651453204A7F315744E5C0',
            timestamp: '2021-02-16T13:58:40.691559082Z',
            signature:
              'wPThPQbiSPGPp9yJOymqKOfS8tyrNt/AQLtfNCwzktmOC2BAGn9DofJ/K424XO3cHI5Je4jM0tL5lQ6CCKCLAw==',
          },
          {
            block_id_flag: 2,
            validator_address: 'C3D99B56876D887D7F91B971CE3552EBCB96283E',
            timestamp: '2021-02-16T13:58:40.692096446Z',
            signature:
              'Qst5FUipo6SkfMr1AEZDpnvTqGa+2BB/iGMyC8H3Bhdk5cpjCzY8+KiY0fO38jWInInaFPE4JEPORj57VAZVDw==',
          },
        ],
      },
    },
  };
  return item;
};

const mockBlocks = (blocks = 10) => {
  let counter = 0;
  const list = new Array(blocks).fill(null).map(() => {
    counter++;
    return mockBlock(`${counter}`)['block'];
  });
  return list;
};

export { mockBlock, mockBlocks };
