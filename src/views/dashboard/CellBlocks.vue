<template>
  <TableCell
    :isFetching="isFetching"
    :link="linkToBlocks"
    :title="$t('titles.blocks')"
  >
    <div slot="main-content">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s13-w700">
              <th scope="col">Height</th>
              <th scope="col">Proposer</th>
              <th scope="col">Txs</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <CellBlocksRow
              v-for="block in blocks"
              :key="block.header.height"
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
import { arrayManager } from "Utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CellBlocks",
  description: "Display the blocks table",
  components: {
    CellBlocksRow,
    TableCell
  },
  computed: {
    ...mapGetters("blocks", {
      allBlocks: "blocks",
      isFetching: "isFetching"
    }),
    blocks() {
      const blocks = arrayManager.uniqueByKey(this.allBlocks, JSON.stringify);
      return blocks
        .sort(function(a, b) {
          return b.header.height - a.header.height;
        })
        .slice(0, 10);
    },
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
    ...mapActions("blocks", {
      fetchBlocks: "fetchBlocks"
    })
  },
  created() {
    if (this.allBlocks.length === 0) this.fetchBlocks();
  }
};
</script>
