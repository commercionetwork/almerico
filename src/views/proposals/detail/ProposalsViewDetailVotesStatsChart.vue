<template>
  <BaseChart
    v-if="chartData && chartOptions"
    :id="CHARTS.ID.PROPOSAL_DETAIL"
    :dataset="chartData"
    :options="chartOptions"
    :type="CHARTS.TYPE.PIE"
    height="225"
    width="225"
  />
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';

import proposalChartHelper from './helpers/proposalChartHelper';
import { CHARTS } from '@/constants';

export default {
  name: 'ProposalsViewDetailVotesStatsChart',
  components: { BaseChart },
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
