<template>
  <base-top-content-card :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <base-chart
          :id="CHARTS.ID.DASHBOARD_TOKEN"
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
  name: 'HomeViewChartTokens',
  data() {
    return {
      CHARTS,
    };
  },
  computed: {
    ...mapGetters('home', ['tokensChart']),
    chartData() {
      return tokensChartHelper.getChartData(this.$t, this, this.tokensChart);
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
