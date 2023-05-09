<template>
  <base-chart
    v-if="chartData && chartOptions"
    :id="CHARTS.ID.PROPOSAL_DETAIL"
    :dataset="chartData"
    :options="chartOptions"
    :type="CHARTS.TYPE.PIE"
    height="100"
    width="100"
  />
</template>

<script>
import proposalChartHelper from './helpers/proposalChartHelper';
import { CHARTS } from '@/constants';

export default {
  name: 'ProposalsViewDetailVotesStatsChart',
  props: {
    stats: {
      type: Object,
      required: true,
      note: 'The data to show',
    },
  },
  data() {
    return {
      CHARTS,
    };
  },
  computed: {
    chartData() {
      return proposalChartHelper.getChartData(this.stats.votes);
    },
    chartOptions() {
      return proposalChartHelper.getChartOptions();
    },
  },
};
</script>
