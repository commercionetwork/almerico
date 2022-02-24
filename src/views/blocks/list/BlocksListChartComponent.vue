<template>
  <TopContentCardComponent :title="chartLabel">
    <template v-slot:content>
      <div class="fill-height">
        <ChartComponent
          id="blocks-chart"
          type="pie"
          :dataset="chartData"
          :options="chartOptions"
        />
      </div>
    </template>
  </TopContentCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

import { mapGetters } from 'vuex';
import blocksChartHelper from './helpers/blocksChartHelper';

export default {
  name: 'BlocksListChartComponent',
  components: {
    ChartComponent,
    TopContentCardComponent,
  },
  computed: {
    ...mapGetters('blocks', {
      blocks: 'blocks',
    }),
    chartData() {
      return blocksChartHelper.getChartData(this.blocks, {
        blocks: this.$t('labels.blocks'),
        txs: this.$t('labels.txs'),
      });
    },
    chartLabel() {
      return blocksChartHelper.getChartLabel(
        this.blocks,
        this.$t('titles.txsBlocks'),
      );
    },
    chartOptions() {
      return blocksChartHelper.getChartOptions();
    },
  },
};
</script>
