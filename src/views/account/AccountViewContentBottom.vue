<template>
  <v-row class="mt-1">
    <v-col cols="12">
      <v-card outlined>
        <AccountViewTransactions :items="items" />
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
      <BaseLoadingLinear v-if="isAdding" />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewTransactions from './AccountViewTransactions.vue';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import { mapActions, mapGetters } from 'vuex';
import { txsTableAdapter } from '@/utils';

export default {
  name: 'AccountViewContentBottom',
  components: {
    AccountViewTransactions,
    BaseLoadingLinear,
  },
  computed: {
    ...mapGetters('account', {
      isAdding: 'isAddingTxs',
      offset: 'transactionsOffset',
      total: 'transactionsTotal',
      transactions: 'transactions',
    }),
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
    ...mapActions('account', {
      addTransactions: 'addTransactions',
    }),
    onIntersect(_entries, _observer, isIntersecting) {
      if (isIntersecting && this.total > this.offset) {
        this.addTransactions({
          address: this.address,
          offset: this.offset,
        });
      }
    },
  },
};
</script>
