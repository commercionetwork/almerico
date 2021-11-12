<template>
  <ChartContainerComponent :title="chartLabel">
    <template v-slot:chart>
      <ChartComponent
        id="account-details-performance-chart"
        type="pie"
        height="150"
        :dataset="chartData"
        :options="chartOptions"
      />
    </template>
  </ChartContainerComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import ChartContainerComponent from '@/components/chart/ChartContainerComponent';

import accountPerformanceChartHelper from './helpers/accountPerformanceChartHelper';

export default {
  name: 'AccountPerformanceChartComponent',
  props: {
    assets: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  components: {
    ChartComponent,
    ChartContainerComponent,
  },
  computed: {
    chartData() {
      return accountPerformanceChartHelper.getChartData(this.assets, {
        earning: this.$t('labels.earningRewards'),
        notEarning: this.$t('labels.notEarningRewards'),
      });
    },
    chartLabel() {
      return accountPerformanceChartHelper.getChartLabel(
        this.$t('labels.tokensPerformance'),
      );
    },
    chartOptions() {
      return accountPerformanceChartHelper.getChartOptions();
    },
  },
};
</script>
