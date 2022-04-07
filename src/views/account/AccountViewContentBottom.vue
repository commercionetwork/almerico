<template>
  <v-row class="mt-1">
    <v-col cols="12">
      <v-card outlined>
        <AccountViewContentBottomTransactions :items="items" />
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
      <BaseLoadingLinear v-if="isAddingTxs" />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewContentBottomTransactions from './AccountViewContentBottomTransactions.vue';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import { mapActions, mapGetters } from 'vuex';
import { txsTableAdapter } from '@/utils';

export default {
  name: 'AccountViewContentBottom',
  components: {
    AccountViewContentBottomTransactions,
    BaseLoadingLinear,
  },
  inject: ['address'],
  computed: {
    ...mapGetters('account', [
      'isAddingTxs',
      'transactions',
      'transactionsOffset',
      'transactionsTotal',
    ]),
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
    ...mapActions('account', ['addTransactions']),
    onIntersect(_entries, _observer, isIntersecting) {
      if (isIntersecting && this.transactionsTotal > this.transactionsOffset) {
        this.addTransactions({
          address: this.address,
          offset: this.transactionsOffset,
        });
      }
    },
  },
};
</script>
