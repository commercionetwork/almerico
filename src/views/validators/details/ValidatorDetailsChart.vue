<template>
  <TopBodyCardComponent :title="caption">
    <template v-slot:content>
      <v-layout fill-height>
        <ChartComponent
          id="validator-details-chart"
          type="doughnut"
          :data="chartData"
          :options="options"
        />
      </v-layout>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import { numberIntlFormatter } from '@/utils';

export default {
  name: 'ValidatorDetailsChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  props: {
    delegations: {
      type: Object,
      required: true,
      note: 'The account delegations',
    },
  },
  computed: {
    chartData() {
      return {
        labels: [`Others ${this.others} M`, `Self ${this.self} M`],
        datasets: [
          {
            data: [this.others, this.self],
            backgroundColor: ['#42A5F5', '#1976D2'],
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
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
      return this.total ? `Delegated ${this.total} M` : '-';
    },
    others() {
      return this.formatTokens(this.delegations['others']);
    },
    self() {
      return this.formatTokens(this.delegations['self']);
    },
    total() {
      return this.formatTokens(this.delegations['total']);
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
