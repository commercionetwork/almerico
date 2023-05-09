<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-title class="text-truncate text-overline font-weight-bold">
      <span v-text="chartLabel" />
    </v-card-title>
    <v-card-text>
      <base-chart
        :id="CHARTS.ID.ACCOUNT_DETAIL_CAPITALIZATION"
        :dataset="chartData"
        :options="chartOptions"
        :type="CHARTS.TYPE.BAR"
        height="300"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import accountCapitalizationChartHelper from '../helpers/accountCapitalizationChartHelper';
import { CHARTS } from '@/constants';

export default {
  name: 'AccountViewDashboardChartCapitalization',
  props: {
    capitalization: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  data() {
    return {
      CHARTS,
    };
  },
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
