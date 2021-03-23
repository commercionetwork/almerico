<template>
  <v-layout align-center justify-center column fill-height>
    <span class="text-caption font-weight-medium" v-text="caption" />
    <DoughnutChart
      :chartData="chartData"
      :options="options"
      height="150"
      width="150"
    />
  </v-layout>
</template>

<script>
import DoughnutChart from '@/components/DoughnutChart';

import { numberIntlFormatter } from '@/utils';

export default {
  name: 'AccountDetailsChart',
  props: {
    amounts: {
      type: Object,
      required: true,
      note: 'The amounts to display',
    },
  },
  components: {
    DoughnutChart,
  },
  computed: {
    chartData() {
      return {
        labels: [
          `Delegations ${this.delegations} M`,
          `Unbondings ${this.unbondings} M`,
          `Rewards ${this.rewards} M`,
        ],
        datasets: [
          {
            data: [this.delegations, this.unbondings, this.rewards],
            backgroundColor: ['#FFA000', '#0288D1', '#D32F2F'],
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        legend: {
          display: false,
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
    caption() {
      return `Capitalization ${this.formatTokens(this.amounts['total'])} M`;
    },
    delegations() {
      return this.formatTokens(this.amounts['delegations']);
    },
    unbondings() {
      return this.formatTokens(this.amounts['unbondings']);
    },
    rewards() {
      return this.formatTokens(this.amounts['rewards']);
    },
  },
  methods: {
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
