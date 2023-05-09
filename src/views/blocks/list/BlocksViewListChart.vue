<template>
  <base-top-content-card :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <base-chart
          :id="CHARTS.ID.BLOCKS_LIST"
          :dataset="chartData"
          :options="chartOptions"
          :type="CHARTS.TYPE.PIE"
        />
      </div>
    </template>
  </base-top-content-card>
</template>

<script>
import blocksChartHelper from './helpers/blocksChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'BlocksViewListChart',
  data() {
    return {
      CHARTS,
    };
  },
  computed: {
    ...mapGetters('blocks', ['blocks']),
    chartData() {
      return blocksChartHelper.getChartData(this.blocks, {
        blocks: this.$t('labels.blocks'),
        txs: this.$t('labels.txs'),
      });
    },
    chartLabel() {
      return blocksChartHelper.getChartLabel(
        this.blocks,
        this.$t('titles.txsBlocks')
      );
    },
    chartOptions() {
      return blocksChartHelper.getChartOptions();
    },
  },
};
</script>
