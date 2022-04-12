<template>
  <v-row>
    <v-col cols="12" md="4">
      <TheLatestHeight />
    </v-col>
    <v-col cols="12" md="4">
      <ProposalsViewListChart />
    </v-col>
    <v-col cols="12" md="4">
      <ProposalsViewListSearch />
    </v-col>
  </v-row>
</template>

<script>
import ProposalsViewListChart from './ProposalsViewListChart.vue';
import ProposalsViewListSearch from './ProposalsViewListSearch.vue';
import TheLatestHeight from '@/components/TheLatestHeight';

export default {
  name: 'ProposalsViewListContentTop',
  components: {
    ProposalsViewListChart,
    ProposalsViewListSearch,
    TheLatestHeight,
  },
};
</script>
