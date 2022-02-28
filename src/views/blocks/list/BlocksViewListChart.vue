<template>
  <BaseTopContentCard :title="chartLabel">
    <template v-slot:content>
      <div class="fill-height">
        <BaseChart
          id="blocks-chart"
          type="pie"
          :dataset="chartData"
          :options="chartOptions"
        />
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

import { mapGetters } from 'vuex';
import blocksChartHelper from './helpers/blocksChartHelper';

export default {
  name: 'BlocksViewListChart',
  components: {
    BaseChart,
    BaseTopContentCard,
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
        this.$t('titles.txsBlocks')
      );
    },
    chartOptions() {
      return blocksChartHelper.getChartOptions();
    },
  },
};
</script>
