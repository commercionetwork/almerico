<template>
  <BaseTopContentCard :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <BaseChart
          :id="CHARTS.ID.EXCHANGE_RATE_TOKEN"
          :dataset="chartData"
          :options="chartOptions"
          :type="CHARTS.TYPE.PIE"
        />
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

import tokensChartHelper from '@/components/chart/helpers/tokensChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateViewChart',
  components: {
    BaseChart,
    BaseTopContentCard,
  },
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
