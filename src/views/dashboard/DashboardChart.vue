<template>
  <TopBodyCardComponent :title="chartLabel">
    <template v-slot:content>
      <v-layout fill-height>
        <ChartComponent
          id="dashboard-chart"
          type="doughnut"
          :dataset="chartData"
          :options="chartOptions"
        />
      </v-layout>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import tokensChartHelper from '@/utils/tokensChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'DashboardChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('spreadsheet', {
      abrTokens: 'abrTokens',
      vbrTokens: 'vbrTokens',
    }),
    ...mapGetters('starting', {
      params: 'params',
      pool: 'pool',
      tokens: 'tokens',
    }),
    chartData() {
      return tokensChartHelper.getChartData({
        abrTokens: this.abrTokens,
        params: this.params,
        pool: this.pool,
        tokens: this.tokens,
        vbrTokens: this.vbrTokens,
      });
    },
    chartLabel() {
      return tokensChartHelper.getChartLabel();
    },
    chartOptions() {
      return tokensChartHelper.getChartOptions();
    },
  },
};
</script>
