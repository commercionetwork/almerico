<template>
  <BaseTopContentCard :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <BaseChart
          id="dashboard-chart"
          type="pie"
          :dataset="chartData"
          :options="chartOptions"
        />
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

import tokensChartHelper from '@/components/chart/helpers/tokensChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateViewChart',
  components: {
    BaseChart,
    BaseTopContentCard,
  },
  computed: {
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('exchangeRate', [
      'abrTokens',
      'freezedTokens',
      'pool',
      'supply',
      'vbrTokens',
    ]),
    chartData() {
      const labels = {
        bonded: this.$t('labels.bonded'),
        burned: this.$t('labels.burned'),
        freezed: this.$t('labels.freezed'),
        notBonded: this.$t('labels.notBonded'),
        unreleasedRewards: this.$t('labels.unreleasedRewards'),
      };
      return tokensChartHelper.getChartData({
        abrTokens: this.abrTokens,
        freezedTokens: this.freezedTokens,
        params: this.stakingParams,
        pool: this.pool,
        tokens: this.supply,
        vbrTokens: this.vbrTokens,
        labels,
      });
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
