const mockBlock = (height = '1') => {
  const item = {
    block_id: {
      hash: 'CA841D24E43488F98C90F8A226530D807930CAE011EF8F8F52B426E252518DE2',
      parts: {
        total: 1,
        hash: '823E4C126C6D8196C0D233411B193401EAC066B772F21F49ADE683EB782DF337',
      },
    },
    block: {
      header: {
        version: { block: '11' },
        chain_id: 'localnet',
        height,
        time: '2021-11-04T12:19:12.516492344Z',
        last_block_id: {
          hash: '43A2CBD988554B5B662423991C482A5E4E2061B0F216940255F12AA2236AEFB4',
          parts: {
            total: 1,
            hash: '7F460898683F917871F59E18A41BA7146AF6826B5EFDEF9CC356424D85116772',
          },
        },
        last_commit_hash:
          '1FAAD2708CF7F6DDBC240B799CBF519926078425184807F128DA06B27F62CB9E',
        data_hash:
          'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
        validators_hash:
          'C72256F79F2E27E559A8EA3B41AABE5184DC92BEFC1391ECCD3C63C55B7A47CF',
        next_validators_hash:
          'C72256F79F2E27E559A8EA3B41AABE5184DC92BEFC1391ECCD3C63C55B7A47CF',
        consensus_hash:
          '048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F',
        app_hash:
          '0B1120CA8826C984AFF710754AB07E0EBC239F5E433F77B399162C7013F054F2',
        last_results_hash:
          'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
        evidence_hash:
          'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
        proposer_address: '9FDFB8AF1768A9A05203AEAC4ECEA207E3E335C8',
      },
      data: { txs: [] },
      evidence: { evidence: [] },
      last_commit: {
        height: '8077',
        round: 0,
        block_id: {
          hash: '43A2CBD988554B5B662423991C482A5E4E2061B0F216940255F12AA2236AEFB4',
          parts: {
            total: 1,
            hash: '7F460898683F917871F59E18A41BA7146AF6826B5EFDEF9CC356424D85116772',
          },
        },
        signatures: [
          {
            block_id_flag: 2,
            validator_address: '9FDFB8AF1768A9A05203AEAC4ECEA207E3E335C8',
            timestamp: '2021-11-04T12:19:12.516492344Z',
            signature:
              'bdS4zjWJFZon2l7NoSsPEh+TmJbL+EzYOAtcXU/u1V15erWB5OL5Z0Iz/CIeNSu76gN8uojPLZZBVlxXdaBsBQ==',
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
