<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-title class="text-truncate text-overline font-weight-bold">
      <span v-text="chartLabel" />
    </v-card-title>
    <v-card-text>
      <base-chart
        :id="CHARTS.ID.ACCOUNT_DETAIL_PERFORMANCE"
        :dataset="chartData"
        :options="chartOptions"
        :type="CHARTS.TYPE.PIE"
        height="175"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import accountPerformanceChartHelper from '../helpers/accountPerformanceChartHelper';
import { CHARTS } from '@/constants';

export default {
  name: 'AccountViewDashboardChartPerformance',
  props: {
    assets: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  data() {
    return {
      CHARTS,
    };
  },
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
