<template>
  <v-row>
    <v-col cols="12" md="4">
      <TheLatestHeight />
    </v-col>
    <v-col cols="12" md="4">
      <BlocksViewListChart />
    </v-col>
    <v-col cols="12" md="4">
      <BlocksViewListSearch />
    </v-col>
  </v-row>
</template>

<script>
import BlocksViewListChart from './BlocksViewListChart.vue';
import BlocksViewListSearch from './BlocksViewListSearch.vue';
import TheLatestHeight from '@/components/TheLatestHeight';

export default {
  name: 'BlocksViewListContentTop',
  components: {
    BlocksViewListChart,
    BlocksViewListSearch,
    TheLatestHeight,
  },
};
</script>
