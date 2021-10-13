<template>
  <v-row>
    <DashboardGridListItem
      v-for="(transaction, index) in transactions"
      :key="index"
      :transaction="transaction"
    />
  </v-row>
</template>

<script>
import DashboardGridListItem from './DashboardGridListItem';

import { arrayHandler } from '@/utils';

export default {
  name: 'DashboardGridList',
  components: {
    DashboardGridListItem,
  },
  props: {
    txs: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      required: true,
      note: 'The items number to display',
    },
  },
  computed: {
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
  created() {
    console.log(this.txs);
  },
};
</script>
