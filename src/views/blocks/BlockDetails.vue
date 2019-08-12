<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-text="title"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
      </div>
    </div>
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
      v-text="$t('messages.fetchingError')"
      data-test="has-error"
    />
    <div
      v-else
      class="row rounded com-bg-header"
      data-test="item"
    >
      <div class="col-12 p-0">
        <div class="row">
          <div class="col-12">
            <BlockDetailsHeader :block="block" />
          </div>
        </div>
        <div
          v-if="$config.block_details.txs_list"
          class="py-3 px-5 rounded com-bg-body"
          data-test="txs-list"
        >
          <div class="row py-1">
            <div class="col-12">
              <BlockDetailsTransactions :transactions="blockTxs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockDetailsHeader from "./BlockDetailsHeader.vue";
import BlockDetailsTransactions from "./BlockDetailsTransactions.vue";
import SearchBar from "Components/common/SearchBar.vue";

import apiBlocks from "Store/blocks/api";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BlockDetails",
  description: "Display the block details",
  components: {
    BlockDetailsHeader,
    BlockDetailsTransactions,
    SearchBar
  },
  data() {
    return {
      block: {},
      hasBlockError: false,
      isFetchingBlock: false
    };
  },
  computed: {
    ...mapGetters("transactions", {
      isFetchingTxs: "isFetching",
      message: "message",
      transactions: "transactions"
    }),
    ...mapGetters("validators", {
      validators: "validators"
    }),
    blockId() {
      return this.$route.params.id;
    },
    blockTxs() {
      return this.transactions.filter(
        transaction => transaction.height === this.blockId
      );
    },
    hasError() {
      return this.hasBlockError || this.message;
    },
    isFetching() {
      return this.isFetchingBlock || this.isFetchingTxs;
    },
    title() {
      let label = this.$t("titles.detailsForBlock");
      let height = this.$route.params.id;
      return `${label} #${height}`;
    }
  },
  watch: {
    blockId(value) {
      this.fetchBlock(value);
    }
  },
  methods: {
    ...mapActions("transactions", {
      fetchTransactions: "fetchTransactions"
    }),
    ...mapActions("validators", {
      getValidators: "getValidators"
    }),
    async fetchBlock(height) {
      this.isFetchingBlock = true;
      try {
        const response = await apiBlocks.requestBlock(height);
        this.block = response.data.block;
      } catch (error) {
        this.hasBlockError = true;
      } finally {
        this.isFetchingBlock = false;
      }
    },
     getTransactions() {
      let types = this.$config.transactions.supported_types.map(
        type => type.tag
      );
      types.forEach(async type => {
        const tag = `message.action=${type}`;
        this.fetchTransactions({ tag: tag, limit: 30 });
      });
    }
  },
  created() {
    this.fetchBlock(this.blockId);
    if (this.transactions.length === 0) this.getTransactions();
  }
};
</script>
