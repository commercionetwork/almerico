<template>
  <BaseTopContentCard :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <BaseChart
          :id="CHARTS.ID.DASHBOARD_TOKEN"
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
  name: 'HomeViewChartTokens',
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
