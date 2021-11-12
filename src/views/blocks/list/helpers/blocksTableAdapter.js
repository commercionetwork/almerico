import { proposerHandler } from '@/utils';
import { orderBy } from 'lodash';

const blocksTableAdapter = {
  /**
   *
   * @param {*} param0
   * @returns
   */
  build({ blocks, validators, validatorSets, prefix }) {
    const sortedBlocks = orderBy(blocks, (block) => block.header.height, [
      'desc',
    ]);
    return _getTableRows({
      blocks: sortedBlocks,
      validators,
      validatorSets,
      prefix,
    });
  },
};

export default blocksTableAdapter;

const _getTableRows = ({ blocks, validators, validatorSets, prefix }) => {
  return blocks.map((block) => {
    const proposer = proposerHandler.getFromHexAddress({
      address: block.header.proposer_address,
      prefix: prefix,
      validatorSets: validatorSets,
      validators: validators,
    });

    const tableRow = new BlockTableRow(block, proposer);
    return tableRow.data;
  });
};

class BlockTableRow {
  constructor(block, proposer) {
    this.block = block;
    this.proposer = proposer;
  }

  get data() {
    return {
      height: this.block.header.height,
      hash: this.block.last_commit.block_id.hash,
      moniker: this.proposer ? this.proposer.description.moniker : '-',
      operator: this.proposer ? this.proposer.operator_address : '-',
      txs:
        this.block.data && this.block.data.txs ? this.block.data.txs.length : 0,
      date: this._formatDate(this.block.header.time),
    };
  }

  _formatDate(timestamp) {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return new Date(timestamp).toLocaleDateString([], options);
  }
}
