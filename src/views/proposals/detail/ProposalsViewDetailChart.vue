<template>
  <v-card outlined>
    <v-card-text>
      <BaseChart
        v-if="chartData && chartOptions"
        :dataset="chartData"
        :options="chartOptions"
        id="proposal-chart"
        type="pie"
        height="300"
        width="300"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';

import proposalChartHelper from './helpers/proposalChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailChart',
  components: { BaseChart },
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
        title: this.$t('titles.tally'),
        darkTheme: this.$vuetify.theme.dark,
      });
    },
  },
};
</script>
