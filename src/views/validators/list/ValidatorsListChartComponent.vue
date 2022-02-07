<template>
  <TopContentCardComponent :title="chartLabel">
    <template v-slot:content>
      <div class="fill-height">
        <ChartComponent
          id="validators-chart"
          type="pie"
          :dataset="chartData"
          :options="chartOptions"
        />
      </div>
    </template>
  </TopContentCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

import validatorsChartHelper from './helpers/validatorsChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsListChartComponent',
  components: {
    ChartComponent,
    TopContentCardComponent,
  },
  computed: {
    ...mapGetters('application', {
      validators: 'validators',
    }),
    chartData() {
      return validatorsChartHelper.getChartData(this.validators, {
        bonded: this.$t('labels.bonded'),
        notBonded: this.$t('labels.notBonded'),
      });
    },
    chartLabel() {
      return validatorsChartHelper.getChartLabel(
        this.validators,
        this.$t('titles.validators'),
      );
    },
    chartOptions() {
      return validatorsChartHelper.getChartOptions();
    },
  },
};
</script>
