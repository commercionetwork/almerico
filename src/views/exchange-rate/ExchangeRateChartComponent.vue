<template>
  <TopContentCardComponent :title="chartLabel">
    <template v-slot:content>
      <div class="fill-height">
        <ChartComponent
          id="dashboard-chart"
          type="pie"
          :dataset="chartData"
          :options="chartOptions"
        />
      </div>
    </template>
  </TopContentCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

import tokensChartHelper from '@/components/chart/helpers/tokensChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateChartComponent',
  components: {
    ChartComponent,
    TopContentCardComponent,
  },
  computed: {
    ...mapGetters('application', {
      stakingParams: 'stakingParams',
    }),
    ...mapGetters('exchangeRate', {
      abrTokens: 'abrTokens',
      pool: 'pool',
      supply: 'supply',
      vbrTokens: 'vbrTokens',
    }),
    chartData() {
      return tokensChartHelper.getChartData({
        abrTokens: this.abrTokens,
        params: this.stakingParams,
        pool: this.pool,
        tokens: this.supply,
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
