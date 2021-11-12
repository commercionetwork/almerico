<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <HeaderComponent :title="$t('titles.transactions')" />
      <TransactionsListTopContentComponent />
      <TransactionsListTableComponent />
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
  computed: {
    ...mapGetters('transactions', {
      isLoading: 'isLoading',
    }),
  },
  methods: {
    ...mapActions('transactions', {
      initTransactionsList: 'initTransactionsList',
    }),
  },
  created() {
    this.initTransactionsList();
  },
};
</script>
