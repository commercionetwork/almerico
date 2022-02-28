<template>
  <v-row>
    <v-col cols="12" md="4">
      <TheLatestHeight />
    </v-col>
    <v-col cols="12" md="4">
      <TransactionsViewListChart />
    </v-col>
    <v-col cols="12" md="4">
      <TransactionsViewListSearch />
    </v-col>
  </v-row>
</template>

<script>
import TheLatestHeight from '@/components/TheLatestHeight';
import TransactionsViewListChart from './TransactionsViewListChart.vue';
import TransactionsViewListSearch from './TransactionsViewListSearch.vue';

export default {
  name: 'TransactionsViewListContentTop',
  components: {
    TheLatestHeight,
    TransactionsViewListChart,
    TransactionsViewListSearch,
  },
};
</script>
