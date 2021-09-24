<template>
  <TopBodyCardComponent :title="caption">
    <template v-slot:content>
      <div v-if="isLoading" data-test="loading">
        <v-progress-circular color="primary" indeterminate size="100" />
      </div>
      <v-layout v-else fill-height data-test="content">
        <ChartComponent
          id="blocks-chart"
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
  name: 'BlocksChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('blocks', {
      isLoading: 'isLoading',
      blocks: 'blocks',
    }),
    chartData() {
      return {
        labels: [`${this.txsValue} Txs`, `${this.blocksValue} Blocks`],
        datasets: [
          {
            data: [this.txsValue, this.blocksValue],
            backgroundColor: ['#FFA000', '#FFCA28'],
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
      return `Txs/blocks: ${this.txsValue}/${this.blocksValue}`;
    },
    blocksValue() {
      return this.blocks.length;
    },
    txsValue() {
      return this.blocks.reduce(
        (acc, block) =>
          block.data && block.data.txs ? acc + block.data.txs.length : acc + 0,
        0,
      );
    },
  },
};
</script>
