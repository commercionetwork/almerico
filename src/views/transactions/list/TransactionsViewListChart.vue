<template>
  <BaseTopContentCard :loading="isRefreshing" :title="chartLabel">
    <template v-slot:content>
      <div class="fill-height">
        <BaseChart
          id="transactions-chart"
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

import transactionsChartHelper from './helpers/transactionsChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsViewListChart',
  components: {
    BaseChart,
    BaseTopContentCard,
  },
  computed: {
    ...mapGetters('transactions', {
      isRefreshing: 'isRefreshing',
      transactions: 'transactions',
    }),
    chartData() {
      return transactionsChartHelper.getChartData(this.transactions, {
        msgs: this.$t('labels.msgs'),
        txs: this.$t('labels.txs'),
      });
    },
    chartLabel() {
      return transactionsChartHelper.getChartLabel(
        this.transactions,
        this.$t('titles.msgsTxs')
      );
    },
    chartOptions() {
      return transactionsChartHelper.getChartOptions();
    },
  },
};
</script>
