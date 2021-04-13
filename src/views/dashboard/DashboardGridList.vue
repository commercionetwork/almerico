<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <v-progress-linear
        indeterminate
        rounded
        color="primary"
        height="25"
        value="10"
      ></v-progress-linear>
    </v-col>
  </v-row>
  <v-row v-else-if="error !== null" data-test="error">
    <v-col cols="12">
      <v-alert border="left" prominent text type="error">
        <span class="text-body-1" v-text="JSON.stringify(error)" />
      </v-alert>
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <DashboardGridListItem
      v-for="(transaction, index) in transactions"
      :key="index"
      :transaction="transaction"
    />
  </v-row>
</template>

<script>
import DashboardGridListItem from './DashboardGridListItem';

import { mapGetters } from 'vuex';
import { arrayHandler } from '@/utils';

export default {
  name: 'DashboardGridList',
  components: {
    DashboardGridListItem,
  },
  props: {
    limit: {
      type: Number,
      required: true,
      note: 'The items number to display',
    },
  },
  computed: {
    ...mapGetters('transactions', {
      isLoading: 'isLoading',
      error: 'error',
      txs: 'transactions',
    }),
    transactions() {
      const unorderedTransactions = this.txs.map((obj) => ({
        ...obj,
      }));
      const orderedTransactions = arrayHandler.sortObjectsByStringPropertyValueDesc(
        unorderedTransactions,
        'timestamp',
      );
      return orderedTransactions.slice(0, this.limit);
    },
  },
};
</script>
