<template>
  <v-row class="mt-1">
    <v-col cols="12" md="8">
      <proposals-view-detail-votes-stats-data :stats="stats" />
    </v-col>
    <v-col cols="12" md="4">
      <proposals-view-detail-votes-stats-chart :stats="stats" />
    </v-col>
  </v-row>
</template>

<script>
import ProposalsViewDetailVotesStatsChart from './ProposalsViewDetailVotesStatsChart.vue';
import ProposalsViewDetailVotesStatsData from './ProposalsViewDetailVotesStatsData.vue';

export default {
  name: 'ProposalsViewDetailVotesStatsBody',
  components: {
    ProposalsViewDetailVotesStatsChart,
    ProposalsViewDetailVotesStatsData,
  },
  props: {
    stats: {
      type: Object,
      required: true,
      note: 'The data to show',
    },
  },
};
</script>
