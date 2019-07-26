<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.blocks')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
      </div>
    </div>
    <SectionHeader />
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
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr class="text-center com-font-s13-w700">
                  <th
                    v-if="$config.blocks.table.columns.height"
                    scope="col"
                    v-text="$t('labels.height')"
                    data-test="table-column-height"
                  />
                  <th
                    v-if="$config.blocks.table.columns.hash"
                    scope="col"
                    v-text="$t('labels.hash')"
                    data-test="table-column-hash"
                  />
                  <th
                    v-if="$config.blocks.table.columns.proposer"
                    scope="col"
                    v-text="$t('labels.proposer')"
                    data-test="table-column-proposer"
                  />
                  <th
                    v-if="$config.blocks.table.columns.txs"
                    scope="col"
                    v-text="$t('labels.txs')"
                    data-test="table-column-txs"
                  />
                  <th
                    v-if="$config.blocks.table.columns.date"
                    scope="col"
                    v-text="$t('labels.date')"
                    data-test="table-column-date"
                  />
                </tr>
              </thead>
              <tbody v-if="isFetching">
                <span
                  class="com-font-s14-w400"
                  v-text="$t('messages.loading')"
                  data-test="loading"
                />
              </tbody>
              <tbody v-else-if="!isFetching && hasError">
                <span
                  class="text-danger com-font-s14-w400"
                  v-text="message"
                  data-test="has-error"
                />
              </tbody>
              <tbody v-else-if="!isFetching && !hasError && blocks.length > 0">
                <TableBlocksRow
                  v-for="(block, index) in blocksList"
                  :key="index"
                  :block="block"
                  :rank="index"
                  data-test="items"
                />
              </tbody>
              <tbody v-else>
                <span
                  class="text-center text-info com-font-s14-w700"
                  v-text="$t('messages.noItems')"
                  data-test="no-items"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "Components/common/Pagination.vue";
import SectionHeader from "Components/common/SectionHeader.vue";
import SearchBar from "Components/common/SearchBar.vue";
import TableBlocksRow from "./TableBlocksRow.vue";

import { arrayManager } from "Utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Blocks",
  description: "Container for blocks' section",
  components: {
    Pagination,
    SectionHeader,
    SearchBar,
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
