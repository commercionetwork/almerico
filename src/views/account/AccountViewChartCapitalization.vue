<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-title
      class="text-truncate text-overline font-weight-bold"
      v-text="chartLabel"
    />
    <v-card-text>
      <BaseChart
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
import BaseChart from '@/components/chart/BaseChart';

import accountCapitalizationChartHelper from './helpers/accountCapitalizationChartHelper';

export default {
  name: 'AccountViewChartCapitalization',
  props: {
    capitalization: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  components: { BaseChart },
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
        }
      );
    },
    chartLabel() {
      return accountCapitalizationChartHelper.getChartLabel(
        this.capitalization,
        this.$t('labels.comTotal')
      );
    },
    chartOptions() {
      return accountCapitalizationChartHelper.getChartOptions();
    },
  },
};
</script>
