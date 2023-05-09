<template>
  <v-row>
    <v-col cols="12" md="4">
      <the-latest-height />
    </v-col>
    <v-col cols="12" md="4">
      <transactions-view-list-chart />
    </v-col>
    <v-col cols="12" md="4">
      <transactions-view-list-search />
    </v-col>
  </v-row>
</template>

<script>
import TransactionsViewListChart from './TransactionsViewListChart.vue';
import TransactionsViewListSearch from './TransactionsViewListSearch.vue';

export default {
  name: 'TransactionsViewListContentTop',
  components: {
    TransactionsViewListChart,
    TransactionsViewListSearch,
  },
};
</script>
