import { mockValidatorSets } from '@/__mocks__';

const mockBlock = ({
  height = 1,
  validator_address = '3E4FC2A7AFC75B3D0B73B1127B0C6D0D4E57E72C',
} = {}) => {
  const item = {
    block_id: {
      hash: '0005F2E50A083A0BF9323E4171AC247037ADCF625AC67D695FD591737B341067',
      parts: {
        total: 1,
        hash: '100F7A22AD075DDB77AC3B2394EC50C7A94A626C54D470B6C53565A958606AE9',
      },
    },
    block: {
      header: {
        version: { block: '11' },
        chain_id: 'localnet',
        height: height + '',
        time: '2021-11-15T09:50:09.446815491Z',
        last_block_id: {
          hash: '6B9C8AB5BD9DD5A4A5F92E40BF5A5F3680C9E83CB99AC5E4E2AA99DC1EB3E4CC',
          parts: {
            total: 1,
            hash: '83749E406B5E76BA3AF486542E6DA753CFAAB67F40BB0284CE43ADFE5B0415F7',
          },
        },
        last_commit_hash:
          'CA7EF21AD1917A69F6073B1E11D55A0AAC114EFC46482940C5B6F8680DB36FA2',
        data_hash:
          'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
        validators_hash:
          'ED293C33E684DD8390AEC007921F26FF103FCEEB88E20CEC4315848E9DBA3E95',
        next_validators_hash:
          'ED293C33E684DD8390AEC007921F26FF103FCEEB88E20CEC4315848E9DBA3E95',
        consensus_hash:
          '048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F',
        app_hash:
          '4F787B3E6C7B9B18DCC5D7AEAC4DA9EDE19494750142AE27340E420886C542C9',
        last_results_hash:
          'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
        evidence_hash:
          'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
        proposer_address: 'BB5A584A6713CA2C8B0A199410ABE09C6F5A18F0',
      },
      data: { txs: [] },
      evidence: { evidence: [] },
      last_commit: {
        height: height - 1 + '',
        round: 0,
        block_id: {
          hash: '6B9C8AB5BD9DD5A4A5F92E40BF5A5F3680C9E83CB99AC5E4E2AA99DC1EB3E4CC',
          parts: {
            total: 1,
            hash: '83749E406B5E76BA3AF486542E6DA753CFAAB67F40BB0284CE43ADFE5B0415F7',
          },
        },
        signatures: [
          {
            block_id_flag: 2,
            validator_address,
            timestamp: '2022-03-02T14:35:44.011932404Z',
            signature:
              'NTh13pLxqYuK+gpFDIAQ3acdJy6v1EoU39kD18TbcZU6qyhqiNtjCMRHBg4Lw+SvNUi382SoxAeoskfivhX7Cw==',
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
    return {
      ...mockBlock({ height: `${counter}` }),
      ...mockValidatorSets(`${counter}`),
    };
  });
  return list;
};

const mockBlockSupposedTime = (height = '1') => {
  const item = {
    height,
    milliseconds: 1000,
  };
  return item;
};

export { mockBlock, mockBlocks, mockBlockSupposedTime };
