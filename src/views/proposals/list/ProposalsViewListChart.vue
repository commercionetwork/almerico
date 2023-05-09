<template>
  <base-top-content-card :title="$t('titles.proposalsByType')">
    <template #content>
      <div class="fill-height">
        <base-chart
          v-if="chartData && chartOptions"
          :id="CHARTS.ID.PROPOSALS_LIST"
          :dataset="chartData"
          :options="chartOptions"
          :type="CHARTS.TYPE.PIE"
        />
      </div>
    </template>
  </base-top-content-card>
</template>

<script>
import proposalsChartHelper from './helpers/proposalsChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewListChart',
  data() {
    return {
      CHARTS,
    };
  },
  computed: {
    ...mapGetters('proposals', ['list', 'filter']),
    chartData() {
      return proposalsChartHelper.getChartData(this.list);
    },
    chartOptions() {
      return proposalsChartHelper.getChartOptions();
    },
  },
};
</script>
