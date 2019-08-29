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
    <div
      v-if="$config.blocks.live_data.enabled"
      class="row my-1"
      data-test="live-data"
    >
      <div class="col-12">
        <SectionHeader
          :bondedEnabled="$config.blocks.live_data.bonded"
          :heightEnabled="$config.blocks.live_data.height"
          :priceEnabled="$config.blocks.live_data.price"
        />
      </div>
    </div>
    <div class="row rounded com-bg-body">
      <div class="col-12">
        <div class="row pt-3 pb-0 px-5">
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
        <div class="row pt-0 pb-1 px-5">
          <div class="col-12">
            <div
              v-if="isFetching"
              class="alert alert-warning"
              role="alert"
              v-text="$t('messages.loading')"
              data-test="loading"
            />
            <div
              v-else-if="!isFetching && hasError"
              class="alert alert-danger"
              role="alert"
              v-text="message"
              data-test="has-error"
            />
            <TableBlocks
              v-else-if="!isFetching && !hasError && blocks.length > 0"
              :blocks="blocksList"
              data-test="items"
            />
            <div
              v-else
              class="alert alert-info"
              role="alert"
              v-text="$t('messages.noItems')"
              data-test="no-items"
            />
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
import TableBlocks from "./TableBlocks.vue";

import { arrayManager } from "Utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Blocks",
  description: "Container for blocks' section",
  components: {
    Pagination,
    SectionHeader,
    SearchBar,
    TableBlocks
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
      isFetchingBlocks: "isFetching",
      lastBlock: "lastBlock",
      message: "message"
    }),
    ...mapGetters("validators", {
      isFetchingValidators: "isFetching"
    }),
    blocksList() {
      const blocks = arrayManager.uniqueByKey(this.allBlocks, JSON.stringify);
      return blocks
        .sort(function(a, b) {
          return b.header.height - a.header.height;
        })
        .slice(0, this.limit);
    },
    isFetching() {
      return this.isFetchingBlocks || this.isFetchingValidators;
    },
    total() {
      return parseInt(this.lastBlock.header.height);
    }
  },
  watch: {
    lastBlock(value) {
      if (this.allBlocks.length === 0) {
        this.getBlocks(this.limit, this.page);
      } else if (this.page === 1) {
        this.allBlocks.push(value);
      } else {
        const height = parseInt(this.blocksList[0].header.height);
        this.getBlock(height + 1);
      }
    }
  },
  methods: {
    ...mapActions("blocks", {
      fetchBlock: "fetchBlock",
      fetchBlocks: "fetchBlocks",
    }),
    async getBlock(height) {
      try {
        await this.fetchBlock(height);
        this.allBlocks = this.blocks;
      } catch (error) {
        this.hasError = true;
      }
    },
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
