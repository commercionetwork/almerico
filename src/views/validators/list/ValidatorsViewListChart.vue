<template>
  <base-top-content-card :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <base-chart
          :id="CHARTS.ID.VALIDATORS_LIST"
          :dataset="dataset"
          :options="chartOptions"
          :type="CHARTS.TYPE.PIE"
        />
      </div>
    </template>
  </base-top-content-card>
</template>

<script>
import validatorsChartHelper from './helpers/validatorsChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewListChart',
  data() {
    return {
      CHARTS,
      dataset: null,
    };
  },
  computed: {
    ...mapGetters('validators', ['list']),
    chartLabel() {
      return validatorsChartHelper.getChartLabel(
        this.list,
        this.$t('titles.validators')
      );
    },
    chartOptions() {
      return validatorsChartHelper.getChartOptions();
    },
  },
  watch: {
    list(value, oldValue) {
      const bondedList = value.filter((it) => it.active).length;
      const oldBondedList = oldValue.filter((it) => it.active).length;
      if (bondedList !== oldBondedList) {
        this.setDataset(value);
      }
    },
  },
  created() {
    this.setDataset(this.list);
  },
  methods: {
    setDataset(list) {
      this.dataset = validatorsChartHelper.getChartData(list, {
        bonded: this.$t('labels.bonded'),
        notBonded: this.$t('labels.notBonded'),
      });
    },
  },
};
</script>
