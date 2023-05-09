<template>
  <base-top-content-card :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <base-chart
          :id="CHARTS.ID.EXCHANGE_RATE_TOKEN"
          :dataset="chartData"
          :options="chartOptions"
          :type="CHARTS.TYPE.PIE"
        />
      </div>
    </template>
  </base-top-content-card>
</template>

<script>
import tokensChartHelper from '@/components/chart/helpers/tokensChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateViewChart',
  data() {
    return {
      CHARTS,
    };
  },
  computed: {
    ...mapGetters('exchangeRate', ['chart']),
    chartData() {
      return tokensChartHelper.getChartData(this.$t, this, this.chart);
    },
    chartLabel() {
      return tokensChartHelper.getChartLabel(this.$t('titles.total'));
    },
    chartOptions() {
      return tokensChartHelper.getChartOptions();
    },
  },
};
</script>
