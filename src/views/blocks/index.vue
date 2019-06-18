<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.blocks')" />
    <div class="py-3 px-5 rounded bg-white">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr class="text-center com-font-s13-w700">
              <th scope="col">Height</th>
              <th scope="col">Block Hash</th>
              <th scope="col">Proposer</th>
              <th scope="col">Txs</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <TableBlocksRow
              v-for="block in blocks"
              :key="block.header.height"
              :block="block"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import TableBlocksRow from "./TableBlocksRow.vue";

import { mapGetters } from "vuex";

export default {
  name: "Blocks",
  description: "Container for blocks' section",
  components: {
    SectionHeader,
    TableBlocksRow
  },
  computed: {
    ...mapGetters("tendermint", {
      allBlocks: "blocks"
    }),
    blocks() {
      return this.allBlocks.slice(0, 19);
    }
  }
};
</script>
