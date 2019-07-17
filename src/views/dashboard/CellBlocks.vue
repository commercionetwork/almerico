<template>
  <TableCell
    :isFetching="isFetching"
    :link="linkToBlocks"
    :title="$t('titles.blocks')"
  >
    <div slot="main-content">
      <div
        v-if="hasError"
        v-text="message"
      />
      <div
        v-if="!hasError && blocksList.length > 0"
        class="table-responsive"
      >
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s13-w700">
              <th
                scope="col"
                v-text="$t('labels.height')"
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
            <CellBlocksRow
              v-for="(block,index) in blocksList"
              :key="index"
              :block="block"
            />
          </tbody>
        </table>
      </div>
      <div
        v-else
        class="text-center com-font-s13-w700"
        v-text="$t('messages.noItems')"
      />
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
      isFetching: "isFetching",
      lastBlock: "lastBlock",
      message: "message"
    }),
    blocksList() {
      const blocks = arrayManager.uniqueByKey(this.allBlocks, JSON.stringify);
      return blocks
        .sort(function(a, b) {
          return b.header.height - a.header.height;
        })
        .slice(0, this.limit);
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
      this.allBlocks.push(value);
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
