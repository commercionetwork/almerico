<template>
  <TopBodyCardComponent :title="caption">
    <template v-slot:content>
      <v-layout align-center justify-center column fill-height>
        <ChartComponent
          id="transactions-chart"
          height="150"
          width="150"
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

import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('transactions', {
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
