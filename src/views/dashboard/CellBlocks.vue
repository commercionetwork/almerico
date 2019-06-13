<template>
  <TableCell
    :isFetching="isFetching"
    :link="linkToBlocks"
    :title="$t('titles.blocks')"
  >
    <div slot="main-content">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">Height</th>
              <th scope="col">Proposer</th>
              <th scope="col">Txs</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <CellBlocksRow
              v-for="block in blocks"
              :key="block.block_id.hash"
              :block="block"
            />
          </tbody>
        </table>
      </div>
    </div>
  </TableCell>
</template>

<script>
import CellBlocksRow from "./CellBlocksRow.vue";
import TableCell from "Components/common/TableCell.vue";

import { ROUTE_NAMES } from "Constants";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CellBlocks",
  description: "Display the blocks table",
  components: {
    CellBlocksRow,
    TableCell
  },
  computed: {
    ...mapGetters("tendermint", {
      blocks: "blocks",
      isFetching: "isFetching"
    }),
    linkToBlocks() {
      return {
        name: ROUTE_NAMES.BLOCKS,
        params: {
          lang: this.$i18n.locale
        }
      };
    }
  },
  methods: {
    ...mapActions("tendermint", {
      getBlocks: "getBlocks"
    })
  },
  created() {
    this.getBlocks(4);
  }
};
</script>
