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
import DoughnutChart from "@/components/DoughnutChart";

import { mapGetters } from "vuex";

export default {
  name: "TransactionsChart",
  components: {
    DoughnutChart,
  },
  computed: {
    ...mapGetters("transactions", {
      transactions: "transactions",
    }),
    chartData() {
      return {
        labels: [`${this.txs} Txs`, `${this.msgs} Msgs`],
        datasets: [
          {
            data: [this.txs, this.msgs],
            backgroundColor: ["#7B1FA2", "#AB47BC"],
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
            label: function (tooltipItem, data) {
              return data["labels"][tooltipItem["index"]];
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
        0
      );
    },
    txs() {
      return this.transactions.length;
    },
  },
};
</script>