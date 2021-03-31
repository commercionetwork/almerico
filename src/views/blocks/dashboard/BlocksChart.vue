<template>
  <TopBodyCardComponent :title="caption">
    <template v-slot:content>
      <v-layout align-center justify-center column fill-height>
        <DoughnutChartComponent
          :chartData="chartData"
          :options="options"
          height="150"
          width="150"
        />
      </v-layout>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import DoughnutChartComponent from "@/components/DoughnutChartComponent";
import TopBodyCardComponent from "@/components/TopBodyCardComponent.vue";

import { mapGetters } from "vuex";

export default {
  name: "BlocksChart",
  components: {
    DoughnutChartComponent,
    TopBodyCardComponent
  },
  computed: {
    ...mapGetters("blocks", {
      blocks: "blocks"
    }),
    chartData() {
      return {
        labels: [`${this.txsValue} Txs`, `${this.blocksValue} Blocks`],
        datasets: [
          {
            data: [this.txsValue, this.blocksValue],
            backgroundColor: ["#FFA000", "#FFCA28"]
          }
        ]
      };
    },
    options() {
      return {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data["labels"][tooltipItem["index"]];
            }
          }
        }
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
    }
  }
};
</script>
