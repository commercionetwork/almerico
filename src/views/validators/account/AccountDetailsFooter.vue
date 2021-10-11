<template>
  <div>
    <v-row v-if="error !== null" data-test="error">
      <v-col cols="12">
        <v-alert border="left" prominent text type="error">
          <span class="text-body-1" v-text="JSON.stringify(error)" />
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-else data-test="content">
      <v-col cols="12">
        <v-card outlined>
          <AccountDetailsTransactions :items="items" />
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
        <v-progress-linear
          v-if="isLoading"
          indeterminate
          rounded
          color="primary"
          height="25"
          value="10"
          data-test="loading"
        ></v-progress-linear
      ></v-col>
    </v-row>
  </div>
</template>

<script>
import AccountDetailsTransactions from './AccountDetailsTransactions';

import { mapActions, mapGetters } from 'vuex';
import { CUSTOMIZATION } from '@/constants';
import { transactionsTableAdapter } from '@/utils';

export default {
  name: 'AccountDetailsFooter',
  components: {
    AccountDetailsTransactions,
  },
  props: {
    address: {
      type: String,
      required: true,
      note: 'The account address',
    },
  },
  computed: {
    ...mapGetters(['error']),
    ...mapGetters('transactions', {
      isLoading: 'isLoading',
      transactions: 'transactions',
    }),
    items() {
      return transactionsTableAdapter.build(this.transactions, '');
    },
  },
  methods: {
    ...mapActions('transactions', {
      fetchTransactionsDescendingOrder: 'fetchTransactionsDescendingOrder',
      changePage: 'changePage',
    }),
    onIntersect(_entries, _observer, isIntersecting) {
      if (isIntersecting) {
        this.changePage({
          diff: 1,
          limit: CUSTOMIZATION.TXS.ACCOUNT_ITEMS,
          query: `message.sender=${this.address}`,
        });
      }
    },
  },
  created() {
    this.fetchTransactionsDescendingOrder({
      limit: CUSTOMIZATION.TXS.ACCOUNT_ITEMS,
      query: `message.sender=${this.address}`,
    });
  },
};
</script>
