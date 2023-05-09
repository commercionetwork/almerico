<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <base-loading-linear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <the-error-message :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <the-header-content :title="$t('titles.transactions')" />
      <transactions-view-list-content-top @search-txs="onSearchTxs" />
      <transactions-view-list-table :tx-type="txType" />
    </v-col>
  </v-row>
</template>

<script>
import TransactionsViewListContentTop from './list/TransactionsViewListContentTop.vue';
import TransactionsViewListTable from './list/TransactionsViewListTable.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TransactionsViewList',
  components: {
    TransactionsViewListContentTop,
    TransactionsViewListTable,
  },
  data() {
    return {
      txType: '',
    };
  },
  computed: {
    ...mapGetters('transactions', ['error', 'isLoading', 'txEventHeight']),
  },
  watch: {
    txEventHeight(value) {
      if (value && !this.txType) this.refreshTransactions();
    },
  },
  created() {
    this.initTransactionsList();
  },
  methods: {
    ...mapActions('transactions', [
      'initTransactionsList',
      'refreshTransactions',
      'searchTransactions',
    ]),
    onSearchTxs(txType) {
      this.txType = txType;
    },
  },
};
</script>
