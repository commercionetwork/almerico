<template>
  <v-row class="mt-1">
    <v-col cols="12">
      <v-card outlined>
        <account-view-dashboard-transactions-filter @filter-txs="onFilterTxs" />
        <account-view-dashboard-transactions :items="items" />
      </v-card>
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0.5],
        },
      }"
    >
      <base-loading-linear v-if="isAddingTxs" />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewDashboardTransactions from './AccountViewDashboardTransactions.vue';
import AccountViewDashboardTransactionsFilter from './AccountViewDashboardTransactionsFilter.vue';

import { mapActions, mapGetters } from 'vuex';
import { txsTableAdapter } from '@/utils';

export default {
  name: 'AccountViewDashboardContentBottom',
  components: {
    AccountViewDashboardTransactions,
    AccountViewDashboardTransactionsFilter,
  },
  data() {
    return {
      isSentTxs: true,
    };
  },
  computed: {
    ...mapGetters('account', [
      'isAddingTxs',
      'transactions',
      'transactionsOffset',
      'transactionsTotal',
    ]),
    address() {
      return this.$route.params.id;
    },
    items() {
      return txsTableAdapter.build({
        txs: this.transactions,
        labels: {
          multiTypes: this.$t('labels.multiTypes'),
          multiValues: this.$t('labels.multiValues'),
        },
      });
    },
  },
  methods: {
    ...mapActions('account', [
      'addTransactions',
      'fetchTransactions',
      'resetTransactions',
    ]),
    onFilterTxs(value) {
      this.resetTransactions();
      this.isSentTxs = value;
      this.fetchTransactions({
        address: this.address,
        sent: value,
      });
    },
    onIntersect(_entries, _observer, isIntersecting) {
      if (isIntersecting && this.transactionsTotal > this.transactionsOffset) {
        this.addTransactions({
          address: this.address,
          offset: this.transactionsOffset,
          sent: this.isSentTxs,
        });
      }
    },
  },
};
</script>
