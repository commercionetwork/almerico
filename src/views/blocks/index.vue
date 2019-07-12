<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.blocks')" />
    <div class="py-3 px-5 rounded bg-white">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s13-w700">
              <th
                scope="col"
                v-text="$t('labels.height')"
              />
              <th
                scope="col"
                v-text="$t('labels.hash')"
              />
              <th
                scope="col"
                v-text="$t('labels.proposer')"
              />
              <th
                scope="col"
                v-text="$t('labels.txs')"
              />
              <th
                scope="col"
                v-text="$t('labels.date')"
              />
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

import { arrayManager } from "Utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Blocks",
  description: "Container for blocks' section",
  components: {
    SectionHeader,
    TableBlocksRow
  },
  computed: {
    ...mapGetters("blocks", {
      allBlocks: "blocks"
    }),
    blocks() {
      const blocks = arrayManager.uniqueByKey(this.allBlocks, JSON.stringify);
      return blocks
        .sort(function(a, b) {
          return b.header.height - a.header.height;
        })
        .slice(0, 20);
    }
  },
  methods: {
    ...mapActions("blocks", {
      fetchBlocks: "fetchBlocks"
    })
  },
  created() {
    this.fetchBlocks(20);
  }
};
</script>
