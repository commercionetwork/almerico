<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr class="text-center com-font-s13-w700">
          <th
            v-if="$config.blocks.table.columns.height"
            scope="col"
            data-test="table-column-height"
          >
            <span v-text="$t('labels.height')" />
          </th>
          <th
            v-if="$config.blocks.table.columns.hash"
            scope="col"
            data-test="table-column-hash"
          >
            <span v-text="$t('labels.hash')" />
          </th>
          <th
            v-if="$config.blocks.table.columns.proposer"
            scope="col"
            data-test="table-column-proposer"
          >
            <span v-text="$t('labels.proposer')" />
          </th>
          <th
            v-if="$config.blocks.table.columns.txs"
            scope="col"
            data-test="table-column-txs"
          >
            <span v-text="$t('labels.txs')" />
          </th>
          <th
            v-if="$config.blocks.table.columns.date"
            scope="col"
            data-test="table-column-date"
          >
            <span v-text="$t('labels.date')" />
          </th>
        </tr>
      </thead>
      <tbody>
        <TableBlocksRow
          v-for="(block, index) in blocks"
          :key="index"
          :block="block"
          :rank="index"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableBlocksRow from "./TableBlocksRow.vue";

export default {
  name: "TableBlocks",
  description: "Display the blocks list",
  props: {
    blocks: {
      type: Array,
      required: true,
      note: "The blocks list to display"
    }
  },
  components: {
    TableBlocksRow
  }
};
</script>
