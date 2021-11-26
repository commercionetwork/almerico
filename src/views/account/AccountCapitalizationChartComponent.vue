<template>
  <v-card outlined class="d-flex fill-height flex-column">
    <v-card-title
      class="
        justify-center
        text-center text-truncate text-overline
        font-weight-bold
      "
      v-text="chartLabel"
    />
    <v-card-text>
      <ChartComponent
        id="account-details-capitalization-chart"
        type="bar"
        height="300"
        :dataset="chartData"
        :options="chartOptions"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';

import accountCapitalizationChartHelper from './helpers/accountCapitalizationChartHelper';

export default {
  name: 'AccountCapitalizationChartComponent',
  props: {
    capitalization: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  components: { ChartComponent },
  computed: {
    chartData() {
      return accountCapitalizationChartHelper.getChartData(
        this.capitalization,
        {
          availables: this.$t('labels.availables'),
          commission: this.$t('labels.commission'),
          delegations: this.$t('labels.delegations'),
          unbondings: this.$t('labels.unbondings'),
          rewards: this.$t('labels.rewards'),
        },
      );
    },
    chartLabel() {
      return accountCapitalizationChartHelper.getChartLabel(
        this.capitalization,
        this.$t('labels.comTotal'),
      );
    },
    chartOptions() {
      return accountCapitalizationChartHelper.getChartOptions();
    },
  },
};
</script>
