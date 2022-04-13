<template>
  <BaseTopContentCard :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <BaseChart
          :id="CHARTS.ID.BLOCKS_LIST"
          :dataset="chartData"
          :options="chartOptions"
          :type="CHARTS.TYPE.PIE"
        />
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

import blocksChartHelper from './helpers/blocksChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'BlocksViewListChart',
  components: {
    BaseChart,
    BaseTopContentCard,
  },
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
