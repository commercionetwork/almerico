<template>
  <BaseTopContentCard :title="$t('titles.proposalsStatus')">
    <template #content>
      <div class="fill-height">
        <BaseChart
          v-if="chartData && chartOptions"
          id="proposals-chart"
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

import proposalsChartHelper from './helpers/proposalsChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewListChart',
  components: {
    BaseChart,
    BaseTopContentCard,
  },
  computed: {
    ...mapGetters('proposals', ['list']),
    chartData() {
      return proposalsChartHelper.getChartData(this.list);
    },
    chartOptions() {
      return proposalsChartHelper.getChartOptions();
    },
  },
};
</script>
