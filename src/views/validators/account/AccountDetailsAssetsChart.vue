<template>
  <ChartContainerComponent>
    <template v-slot:chart>
      <DoughnutChartComponent
        :chartData="chartData"
        :options="options"
        height="200"
        width="200"
      />
    </template>
  </ChartContainerComponent>
</template>

<script>
import DoughnutChartComponent from '@/components/DoughnutChartComponent';
import ChartContainerComponent from '@/components/ChartContainerComponent.vue';

import { numberIntlFormatter } from '@/utils';

export default {
  name: 'AccountDetailsAssetsChart',
  props: {
    assets: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  components: {
    DoughnutChartComponent,
    ChartContainerComponent,
  },
  computed: {
    chartData() {
      return {
        labels: [
          this.formatPercent('Active', this.assets.active, this.assets.total),
          this.formatPercent('Passive', this.assets.passive, this.assets.total),
        ],
        datasets: [
          {
            data: [this.assets.active, this.assets.passive],
            backgroundColor: ['#38ba8c', '#cc3333'],
          },
        ],
      };
    },
    options() {
      return {
        responsive: false,
        legend: {
          display: true,
          position: 'left',
        },
        title: {
          display: true,
          position: 'top',
          text: 'Assets',
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']];
            },
          },
        },
      };
    },
  },
  methods: {
    formatPercent(label, amount, total) {
      const percent = ((amount / total) * 100).toFixed(2);
      return `${label} ${percent}%`;
    },
    formatTokens(value) {
      return numberIntlFormatter.toDecimal({
        amount: value / 1000000,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
    },
  },
};
</script>
