<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <BaseLoadingLinear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <TheErrorMessage :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <TheHeaderContent :title="$t('titles.transactions')" />
      <TransactionsViewListContentTop @search-txs="onSearchTxs" />
      <TransactionsViewListTable :tx-type="txType" />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import TransactionsViewListContentTop from './list/TransactionsViewListContentTop.vue';
import TransactionsViewListTable from './list/TransactionsViewListTable.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TransactionsViewList',
  components: {
    BaseLoadingLinear,
    TheErrorMessage,
    TheHeaderContent,
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
      if (!txType) {
        this.initTransactionsList();
        return;
      }
      const query = `message.action='${txType}'`;
      this.searchTransactions({ query, offset: 0 });
    },
  },
};
</script>
