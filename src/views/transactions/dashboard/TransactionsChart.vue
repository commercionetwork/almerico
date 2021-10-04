<template>
  <TopBodyCardComponent :title="caption">
    <template v-slot:content>
      <div v-if="isLoading" data-test="loading">
        <v-progress-circular color="primary" indeterminate size="100" />
      </div>
      <v-layout v-else fill-height data-test="content">
        <ChartComponent
          id="transactions-chart"
          type="doughnut"
          :dataset="chartData"
          :options="options"
        />
      </v-layout>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('transactions', {
      isLoading: 'isLoading',
      transactions: 'transactions',
    }),
    chartData() {
      return {
        labels: [`${this.txs} Txs`, `${this.msgs} Msgs`],
        datasets: [
          {
            data: [this.txs, this.msgs],
            backgroundColor: ['#7B1FA2', '#AB47BC'],
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
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label;
              },
            },
          },
        },
      };
    },
    caption() {
      return `Msgs/txs: ${this.msgs}/${this.txs}`;
    },
    msgs() {
      return this.transactions.reduce(
        (acc, item) => acc + item.tx.value.msg.length,
        0,
      );
    },
    txs() {
      return this.transactions.length;
    },
  },
};
</script>
