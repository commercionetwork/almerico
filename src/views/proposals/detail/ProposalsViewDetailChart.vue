<template>
  <v-card outlined>
    <v-card-text>
      <BaseChart
        v-if="chartData && chartOptions"
        :id="CHARTS.ID.PROPOSAL_DETAIL"
        :dataset="chartData"
        :options="chartOptions"
        :type="CHARTS.TYPE.PIE"
        height="300"
        width="300"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';

import proposalChartHelper from './helpers/proposalChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailChart',
  components: { BaseChart },
  data() {
    return {
      CHARTS,
    };
  },
  computed: {
    ...mapGetters('proposals', ['tally']),
    chartData() {
      const labels = {
        yes: this.$t('labels.yes'),
        abstain: this.$t('labels.abstain'),
        no: this.$t('labels.no'),
        noWithVeto: this.$t('labels.noWithVeto'),
      };
      return proposalChartHelper.getChartData({ data: this.tally, labels });
    },
    chartOptions() {
      return proposalChartHelper.getChartOptions({
        title: this.$t('titles.statisticsVotes'),
        darkTheme: this.$vuetify.theme.dark,
      });
    },
  },
};
</script>
