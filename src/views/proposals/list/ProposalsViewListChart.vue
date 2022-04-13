<template>
  <BaseTopContentCard :title="$t('titles.proposalsStatus')">
    <template #content>
      <div class="fill-height">
        <BaseChart
          v-if="chartData && chartOptions"
          :id="CHARTS.ID.PROPOSALS_LIST"
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

import proposalsChartHelper from './helpers/proposalsChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewListChart',
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
