<template>
  <TopContentCardComponent :loading="isRefreshing" :title="chartLabel">
    <template v-slot:content>
      <div class="fill-height">
        <ChartComponent
          id="transactions-chart"
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

import transactionsChartHelper from './helpers/transactionsChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsListChartComponent',
  components: {
    ChartComponent,
    TopContentCardComponent,
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
