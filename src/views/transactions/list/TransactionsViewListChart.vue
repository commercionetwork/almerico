<template>
  <base-top-content-card :loading="isRefreshing" :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <base-chart
          :id="CHARTS.ID.TRANSACTIONS_LIST"
          :dataset="chartData"
          :options="chartOptions"
          :type="CHARTS.TYPE.PIE"
        />
      </div>
    </template>
  </base-top-content-card>
</template>

<script>
import transactionsChartHelper from './helpers/transactionsChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsViewListChart',
  data() {
    return {
      CHARTS,
    };
  },
  computed: {
    ...mapGetters('transactions', ['isRefreshing', 'transactions']),
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
