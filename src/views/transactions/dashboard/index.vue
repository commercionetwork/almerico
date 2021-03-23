<template>
  <v-row>
    <v-col cols="12">
      <TransactionsHeader />
      <TransactionsTopBody class="py-1" />
      <TransactionsMiddleBody class="py-1" />
    </v-col>
  </v-row>
</template>

<script>
import TransactionsHeader from './TransactionsHeader';
import TransactionsMiddleBody from './TransactionsMiddleBody';
import TransactionsTopBody from './TransactionsTopBody';

import { mapActions } from 'vuex';

export default {
  name: 'Transactions',
  components: {
    TransactionsHeader,
    TransactionsMiddleBody,
    TransactionsTopBody,
  },
  methods: {
    ...mapActions('transactions', {
      fetchTransactionsDescendingOrder: 'fetchTransactionsDescendingOrder',
      setTransactionsFilter: 'setTransactionsFilter',
    }),
  },
  created() {
    this.fetchTransactionsDescendingOrder();
    this.setTransactionsFilter('');
  },
};
</script>
