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
  name: "BlocksChart",
  components: {
    DoughnutChart,
  },
  computed: {
    ...mapGetters("blocks", {
      blocks: "blocks",
    }),
    chartData() {
      return {
        labels: [`${this.txsValue} Txs`, `${this.blocksValue} Blocks`],
        datasets: [
          {
            data: [this.txsValue, this.blocksValue],
            backgroundColor: ["#FFA000", "#FFCA28"],
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
      return `Txs/blocks: ${this.txsValue}/${this.blocksValue}`;
    },
    blocksValue() {
      return this.blocks.length;
    },
    txsValue() {
      return this.blocks.reduce(
        (acc, block) =>
          block.data && block.data.txs ? acc + block.data.txs.length : acc + 0,
        0
      );
    },
  },
};
</script>