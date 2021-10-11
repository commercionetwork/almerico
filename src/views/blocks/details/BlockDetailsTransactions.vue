<template>
  <v-layout>
    <v-flex>
      <v-card v-if="error !== null" data-test="error">
        <v-alert border="left" prominent text type="error">
          <span class="text-body-1" v-text="JSON.stringify(error)" />
        </v-alert>
      </v-card>
      <v-card v-else outlined data-test="content">
        <BlockDetailsTable
          :height="height"
          :items="items"
          :loading="isLoading"
        />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BlockDetailsTable from './BlockDetailsTable';

import { mapActions, mapGetters } from 'vuex';
import { transactionsTableAdapter } from '@/utils';

export default {
  name: 'BlockDetailsTransactions',
  components: {
    BlockDetailsTable,
  },
  props: {
    height: {
      type: String,
      required: true,
      note: 'The block height',
    },
  },
  computed: {
    ...mapGetters('transactions', {
      error: 'error',
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
    }),
  },
  created() {
    this.fetchTransactionsDescendingOrder({
      query: `tx.minheight=${this.height}&tx.maxheight=${this.height}`,
    });
  },
};
</script>
