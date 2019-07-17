<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.blocks')" />
    <div class="py-3 px-5 rounded bg-white">
      <div class="row">
        <div class="col-12">
          <Pagination
            v-if="blocks.length > 0"
            :limit="limit"
            :page="page"
            :total="total"
            v-on:change-page="changePage"
            data-test="pagination"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div
            v-if="isFetching"
            v-text="$t('messages.loading')"
            data-test="loading"
          />
          <div
            v-else-if="!isFetching && hasError"
            v-text="message"
            data-test="has-error"
          />
          <div
            v-else-if="!isFetching && !hasError && blocks.length > 0"
            class="table-responsive"
            data-test="items"
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
                  v-for="(block, index) in blocksList"
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
            data-test="no-items"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "Components/common/Pagination.vue";
import SectionHeader from "Components/common/SectionHeader.vue";
import TableBlocksRow from "./TableBlocksRow.vue";

import { arrayManager } from "Utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Blocks",
  description: "Container for blocks' section",
  components: {
    Pagination,
    SectionHeader,
    TableBlocksRow
  },
  data() {
    return {
      allBlocks: [],
      hasError: false,
      limit: 20,
      page: 1
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
      const blocks = arrayManager.uniqueByKey(this.blocks, JSON.stringify);
      return blocks
        .sort(function(a, b) {
          return b.header.height - a.header.height;
        })
        .slice(0, this.limit);
    },
    total() {
      return parseInt(this.lastBlock.header.height);
    }
  },
  watch: {
    lastBlock(value) {
      if (this.page === 1) this.allBlocks.push(value);
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
    },
    changePage(page) {
      this.page = page;
      this.getBlocks(this.limit, this.page);
    }
  },
  created() {
    this.getBlocks(this.limit, this.page);
  }
};
</script>
