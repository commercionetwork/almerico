<template>
  <v-row>
    <v-col cols="12" md="4">
      <the-latest-height />
    </v-col>
    <v-col cols="12" md="4">
      <blocks-view-list-chart />
    </v-col>
    <v-col cols="12" md="4">
      <blocks-view-list-search />
    </v-col>
  </v-row>
</template>

<script>
import BlocksViewListChart from './BlocksViewListChart.vue';
import BlocksViewListSearch from './BlocksViewListSearch.vue';

export default {
  name: 'BlocksViewListContentTop',
  components: {
    BlocksViewListChart,
    BlocksViewListSearch,
  },
};
</script>
