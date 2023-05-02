<template>
  <v-row>
    <v-col cols="12" md="4">
      <the-latest-height />
    </v-col>
    <v-col cols="12" md="4">
      <proposals-view-list-chart />
    </v-col>
    <v-col cols="12" md="4">
      <proposals-view-list-search />
    </v-col>
  </v-row>
</template>

<script>
import ProposalsViewListChart from './ProposalsViewListChart.vue';
import ProposalsViewListSearch from './ProposalsViewListSearch.vue';

export default {
  name: 'ProposalsViewListContentTop',
  components: {
    ProposalsViewListChart,
    ProposalsViewListSearch,
  },
};
</script>
