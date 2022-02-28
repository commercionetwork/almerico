<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-title
      class="text-truncate text-overline font-weight-bold"
      v-text="chartLabel"
    />
    <v-card-text>
      <BaseChart
        id="account-details-performance-chart"
        height="175"
        type="pie"
        :dataset="chartData"
        :options="chartOptions"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';

import accountPerformanceChartHelper from './helpers/accountPerformanceChartHelper';

export default {
  name: 'AccountViewChartPerformance',
  props: {
    assets: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  components: { BaseChart },
  computed: {
    chartData() {
      return accountPerformanceChartHelper.getChartData(this.assets, {
        earning: this.$t('labels.earning'),
        notEarning: this.$t('labels.notEarning'),
      });
    },
    chartLabel() {
      return accountPerformanceChartHelper.getChartLabel(
        this.$t('labels.tokensPerformance')
      );
    },
    chartOptions() {
      return accountPerformanceChartHelper.getChartOptions();
    },
  },
};
</script>
