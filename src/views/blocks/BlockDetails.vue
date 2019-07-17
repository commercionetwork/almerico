<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-8 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="title"
        />
      </div>
      <div class="col-12 col-md-4 d-flex justify-content-start justify-content-md-end">
        &nbsp;
      </div>
    </div>
    <div
      v-if="isFetching"
      v-text="$t('messages.loading')"
      data-test="loading"
    />
    <div
      v-else-if="!isFetching && hasError"
      v-text="$t('messages.fetchingError')"
      data-test="has-error"
    />
    <div
      v-else
      class="row rounded bg-light"
      data-test="item"
    >
      <div class="col-12 p-0">
        <div class="row">
          <div class="col-12">
            <BlockDetailsHeader :block="block" />
          </div>
        </div>
        <div class="py-3 px-5 rounded bg-white">
          <div class="row py-1">
            <div class="col-12">
              <BlockDetailsTransactions :transactions="transactions" />
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

import apiTransactions from "Store/transactions/api";
import apiBlocks from "Store/blocks/api";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BlockDetails",
  description: "Display the block details",
  components: {
    BlockDetailsHeader,
    BlockDetailsTransactions
  },
  data() {
    return {
      block: {},
      hasBlockError: false,
      hasTransactionsError: false,
      isFetchingBlock: false,
      isFetchingTransactions: false,
      transactions: []
    };
  },
  computed: {
    ...mapGetters("validators", {
      validators: "validators"
    }),
    hasError() {
      return this.hasBlockError || this.hasTransactionsError;
    },
    isFetching() {
      return this.isFetchingBlock || this.isFetchingTransactions;
    },
    title() {
      let label = this.$t("titles.detailsForBlock");
      let height = this.$route.params.id;
      return `${label} #${height}`;
    }
  },
  methods: {
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
    async fetchTransactions(height) {
      this.isFetchingTransactions = true;
      try {
        const response = await apiTransactions.requestTransactionsByHeight(
          height
        );
        this.transactions = response.data;
      } catch (error) {
        this.hasTransactionsError = true;
      } finally {
        this.isFetchingTransactions = false;
      }
    }
  },
  created() {
    this.fetchBlock(this.$route.params.id);
    this.fetchTransactions(this.$route.params.id);
  }
};
</script>