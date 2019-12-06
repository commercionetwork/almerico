<template>
  <TableCell
    :hasError="hasError"
    :hasItems="blocks.length > 0"
    :isFetching="isFetching"
    :link="linkToBlocks"
    :title="$t('titles.blocks')"
  >
    <div slot="main-content">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s13-w700">
              <th scope="col">
                <span v-text="$t('labels.height')" />
              </th>
              <th scope="col">
                <span v-text="$t('labels.proposer')" />
              </th>
              <th scope="col">
                <span v-text="$t('labels.txs')" />
              </th>
              <th scope="col">
                <span v-text="$t('labels.date')" />
              </th>
            </tr>
          </thead>
          <tbody>
            <CellBlocksRow
              v-for="(block, index) in blocksList"
              :key="index"
              :block="block"
              :rank="index"
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
  data() {
    return {
      allBlocks: [],
      hasError: false,
      limit: 10
    };
  },
  computed: {
    ...mapGetters("blocks", {
      blocks: "blocks",
      isFetchingBlocks: "isFetching",
      lastBlock: "lastBlock"
    }),
    ...mapGetters("validators", {
      isFetchingValidators: "isFetching"
    }),
    blocksList() {
      const blocks = arrayManager.uniqueValuesArrayFromObjectsArray(this.allBlocks);
      return blocks
        .sort(function(a, b) {
          return b.header.height - a.header.height;
        })
        .slice(0, this.limit);
    },
    isFetching() {
      return this.isFetchingBlocks || this.isFetchingValidators;
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
  watch: {
    lastBlock(value) {
      if (this.allBlocks.length > 0) {
        this.allBlocks.push(value);
      } else {
        this.getBlocks(this.limit, 1);
      }
    }
  },
  methods: {
    ...mapActions("blocks", {
      fetchBlocks: "fetchBlocks"
    }),
    async getBlocks(limit, page) {
      try {
        await this.fetchBlocks({
          limit,
          page
        });
        this.allBlocks = this.blocks;
      } catch (error) {
        this.hasError = true;
      }
    }
  },
  created() {
    this.getBlocks(this.limit, 1);
  }
};
</script>
