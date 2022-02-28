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
      <TransactionsListTopContentComponent v-on:search-txs="onSearchTxs" />
      <TransactionsListTableComponent :txType="txType" />
    </v-col>
  </v-row>
</template>

<script>
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TransactionsListTableComponent from './list/TransactionsListTableComponent.vue';
import TransactionsListTopContentComponent from './list/TransactionsListTopContentComponent.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TransactionsList',
  components: {
    TheErrorMessage,
    TheHeaderContent,
    BaseLoadingLinear,
    TransactionsListTableComponent,
    TransactionsListTopContentComponent,
  },
  data: () => ({
    txType: '',
  }),
  computed: {
    ...mapGetters('transactions', {
      error: 'error',
      isLoading: 'isLoading',
      txEventHeight: 'txEventHeight',
    }),
  },
  watch: {
    txEventHeight(value) {
      if (value && !this.txType) this.refreshTransactions();
    },
  },
  methods: {
    ...mapActions('transactions', {
      initTransactionsList: 'initTransactionsList',
      refreshTransactions: 'refreshTransactions',
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
