<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <HeaderComponent :title="$t('titles.transactions')" />
      <TransactionsListTopContentComponent v-on:search-txs="onSearchTxs" />
      <TransactionsListTableComponent :txType="txType" />
    </v-col>
  </v-row>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';
import TransactionsListTableComponent from './list/TransactionsListTableComponent.vue';
import TransactionsListTopContentComponent from './list/TransactionsListTopContentComponent.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TransactionsList',
  components: {
    HeaderComponent,
    LoadingLinearComponent,
    TransactionsListTableComponent,
    TransactionsListTopContentComponent,
  },
  data: () => ({
    txType: '',
  }),
  computed: {
    ...mapGetters('transactions', {
      isLoading: 'isLoading',
    }),
  },
  methods: {
    ...mapActions('transactions', {
      initTransactionsList: 'initTransactionsList',
      searchTransactions: 'searchTransactions',
    }),
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
  created() {
    this.initTransactionsList();
  },
};
</script>
