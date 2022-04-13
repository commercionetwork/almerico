<template>
  <BaseTopContentCard :loading="isRefreshing" :title="chartLabel">
    <template #content>
      <div class="fill-height">
        <BaseChart
          :id="CHARTS.ID.TRANSACTIONS_LIST"
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

import transactionsChartHelper from './helpers/transactionsChartHelper';
import { CHARTS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsViewListChart',
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
