<template>
  <v-row v-if="isFetchingTxs" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <HomeGridListItemComponent
      v-for="(transaction, index) in transactions"
      :key="index"
      :transaction="transaction"
    />
  </v-row>
</template>

<script>
import HomeGridListItemComponent from './HomeGridListItemComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeGridListComponent',
  components: {
    HomeGridListItemComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('home', {
      isFetchingTxs: 'isFetchingTxs',
      transactions: 'transactions',
    }),
  },
  methods: {
    ...mapActions('home', {
      fetchTransactions: 'fetchTransactions',
    }),
  },
  created() {
    this.fetchTransactions();
  },
};
</script>
