<template>
  <ChartContainerComponent :title="title">
    <template v-slot:chart>
      <ChartComponent
        id="account-details-capitalization-chart"
        height="260"
        width="520"
        type="bar"
        :data="chartData"
        :options="options"
      />
    </template>
  </ChartContainerComponent>
</template>

<script>
import ChartContainerComponent from '@/components/ChartContainerComponent';
import ChartComponent from '@/components/chart/ChartComponent';

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
    ChartContainerComponent,
    ChartComponent,
  },
  computed: {
    chartData() {
      return {
        labels: ['Availables', 'Delegations', 'Unbondings', 'Rewards'],
        datasets: [
          {
            data: this.datasets,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
              'rgb(255, 159, 64)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(255, 205, 86)',
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    options() {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0,
              },
            },
          ],
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
      return `COM Total ${total} M`;
    },
    datasets() {
      return [
        this.capitalization.availables / this.denominator,
        this.capitalization.delegations / this.denominator,
        this.capitalization.unbondings / this.denominator,
        this.capitalization.rewards / this.denominator,
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
