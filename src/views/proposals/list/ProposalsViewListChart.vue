<template>
  <BaseTopContentCard :title="title">
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
import { CHARTS, PROPOSALS } from '@/constants';
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
    ...mapGetters('proposals', ['list', 'filter']),
    chartData() {
      return proposalsChartHelper.getChartData(this.list);
    },
    chartOptions() {
      return proposalsChartHelper.getChartOptions();
    },
    title() {
      return PROPOSALS.TEXTS[this.filter]
        ? `${this.$t('titles.proposals')} "${PROPOSALS.TEXTS[this.filter]}"`
        : this.$t('titles.allProposals');
    },
  },
};
</script>
