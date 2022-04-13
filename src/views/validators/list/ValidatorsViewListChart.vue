<template>
  <BaseTopContentCard :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <BaseChart
          :id="CHARTS.ID.VALIDATORS_LIST"
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

import validatorsChartHelper from './helpers/validatorsChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewListChart',
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
    ...mapGetters('application', ['validators']),
    chartData() {
      return validatorsChartHelper.getChartData(this.validators, {
        bonded: this.$t('labels.bonded'),
        notBonded: this.$t('labels.notBonded'),
      });
    },
    chartLabel() {
      return validatorsChartHelper.getChartLabel(
        this.validators,
        this.$t('titles.validators')
      );
    },
    chartOptions() {
      return validatorsChartHelper.getChartOptions();
    },
  },
};
</script>
