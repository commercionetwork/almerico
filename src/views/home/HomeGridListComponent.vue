<template>
  <v-row v-if="isRefreshing" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <HomeGridListItemComponent
      v-for="(transaction, index) in latestTransactions"
      :key="index"
      :transaction="transaction"
    />
  </v-row>
</template>

<script>
import HomeGridListItemComponent from './HomeGridListItemComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { HOME } from '@/constants';
import { mapActions, mapGetters } from 'vuex';
import { orderBy, take } from 'lodash';

export default {
  name: 'HomeGridListComponent',
  components: {
    HomeGridListItemComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('home', {
      isRefreshing: 'isRefreshing',
      transactions: 'transactions',
      txEventHeight: 'txEventHeight',
    }),
    latestTransactions() {
      const sortedTxs = orderBy(this.transactions, ['timestamp'], ['desc']);
      return take(sortedTxs, HOME.TRANSACTIONS_NUMBER);
    },
  },
  watch: {
    txEventHeight(value) {
      if (value) this.refreshTransactions();
    },
  },
  methods: {
    ...mapActions('home', {
      refreshTransactions: 'refreshTransactions',
    }),
  },
};
</script>
