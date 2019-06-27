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
    <div class="py-3 px-5 rounded bg-white">
      <div
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <div v-else>
        <BlockDetailsHeader :block="block" />
        <BlockDetailsTransactions :transactions="transactions" />
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
  name: "BlocksDetails",
  description: "Display the block details",
  components: {
    BlockDetailsHeader,
    BlockDetailsTransactions
  },
  data() {
    return {
      isFetchingBlock: false,
      isFetchingTransactions: false,
      block: null,
      transactions: []
    };
  },
  computed: {
    ...mapGetters("validators", {
      validators: "validators"
    }),
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
        this.block = {};
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
        console.log(error);
      } finally {
        this.isFetchingTransactions = false;
      }
    }
  },
  created() {
    this.fetchBlock(this.$route.params.id);
    this.fetchTransactions(this.$route.params.id);
    if (this.validators.length === 0) this.getValidators({});
  }
};
</script>
