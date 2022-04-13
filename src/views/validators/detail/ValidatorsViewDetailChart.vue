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
        :id="CHARTS.ID.VALIDATOR_DETAIL"
        :dataset="chartData"
        :options="chartOptions"
        :type="CHARTS.TYPE.PIE"
        height="175"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';

import validatorsDetailChartHelper from './helpers/validatorsDetailChartHelper';
import { CHARTS } from '@/constants';

export default {
  name: 'ValidatorsViewDetailChart',
  components: { BaseChart },
  props: {
    delegations: {
      type: Object,
      required: true,
      note: 'The data to draw chart',
    },
  },
  data() {
    return {
      CHARTS,
    };
  },
  computed: {
    chartData() {
      return validatorsDetailChartHelper.getChartData(this.delegations, {
        others: this.$t('labels.others'),
        self: this.$t('labels.self'),
      });
    },
    chartLabel() {
      return validatorsDetailChartHelper.getChartLabel(
        this.delegations,
        this.$t('labels.delegated')
      );
    },
    chartOptions() {
      return validatorsDetailChartHelper.getChartOptions();
    },
  },
};
</script>
