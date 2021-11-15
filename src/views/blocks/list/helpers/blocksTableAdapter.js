import { proposerHandler } from '@/utils';
import { orderBy } from 'lodash';

const blocksTableAdapter = {
  /**
   *
   * @param {*} param0
   * @returns
   */
  build({ blocks, validators, prefix }) {
    const sortedBlocks = orderBy(blocks, (block) => block.block_height, [
      'desc',
    ]);
    return _getTableRows({
      blocks: sortedBlocks,
      validators,
      prefix,
    });
  },
};

export default blocksTableAdapter;

const _getTableRows = ({ blocks, validators, prefix }) => {
  return blocks.map((item) => {
    const proposer = proposerHandler.getFromHexAddress({
      address: item.block.header.proposer_address,
      prefix: prefix,
      validatorSets: item.validators,
      validators: validators,
    });

    const tableRow = new BlockTableRow(item.block, proposer);
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
