<template>
  <v-card outlined>
    <v-card-text>
      <div class="d-flex justify-center">
        <BarChartComponent
          :chartData="chartData"
          :options="options"
          height="300"
          width="450"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import BarChartComponent from '@/components/BarChartComponent';

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
  },
  computed: {
    chartData() {
      return {
        labels: ['Delegations', 'Rewards', 'Unbondings', 'Bank'],
        datasets: [
          {
            label: this.label,
            data: this.datasets,
            backgroundColor: [
              'rgba(54, 162, 235, 0.25)',
              'rgba(75, 192, 192, 0.25)',
              'rgba(153, 102, 255, 0.25)',
              'rgba(201, 203, 207, 0.25)',
            ],
            borderColor: [
              'rgb(54, 162, 235)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    options() {
      return {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    },
    label() {
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
