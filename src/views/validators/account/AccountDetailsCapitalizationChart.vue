<template>
  <ChartContainerComponent>
    <template v-slot:chart>
      <BarChartComponent
        :chartData="chartData"
        :options="options"
        height="300"
        width="450"
      />
    </template>
  </ChartContainerComponent>
</template>

<script>
import BarChartComponent from '@/components/BarChartComponent';
import ChartContainerComponent from '@/components/ChartContainerComponent';

import { numberIntlFormatter } from '@/utils';

export default {
  name: 'AccountDetailsCapitalizationChart',
  props: {
    capitalization: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  components: {
    BarChartComponent,
    ChartContainerComponent,
  },
  computed: {
    chartData() {
      return {
        labels: ['Delegations', 'Rewards', 'Unbondings', 'Bank'],
        datasets: [
          {
            data: this.datasets,
            backgroundColor: [
              'rgba(51, 51, 153, 0.33)',
              'rgba(102, 102, 153, 0.33)',
              'rgba(102, 0, 204, 0.33)',
              'rgba(153, 0, 255, 0.33)',
            ],
            borderColor: [
              'rgb(51, 51, 153)',
              'rgb(102, 102, 153)',
              'rgb(102, 0, 204)',
              'rgb(153, 0, 255)',
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        aspectRatio: 1.5,
        title: {
          display: true,
          text: this.title,
        },
        legend: {
          display: false,
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['datasets'][0]['data'][tooltipItem['index']].toFixed(
                0,
              );
            },
          },
        },
      };
    },
    title() {
      const total = this.formatTokens(this.capitalization.total);
      return `Total ${total} M`;
    },
    datasets() {
      return [
        this.capitalization.delegations / this.denominator,
        this.capitalization.rewards / this.denominator,
        this.capitalization.unbondings / this.denominator,
        this.capitalization.bank / this.denominator,
      ];
    },
    denominator() {
      return 1000000;
    },
  },
  methods: {
    formatTokens(value) {
      return numberIntlFormatter.toDecimal({
        amount: value / this.denominator,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
    },
  },
};
</script>
