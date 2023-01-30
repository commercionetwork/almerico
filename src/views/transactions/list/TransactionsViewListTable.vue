<template>
  <v-row v-if="isRefreshing" data-test="loading">
    <v-col cols="12" class="pa-5">
      <BaseLoadingLinear />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :hide-default-footer="true"
        :items="items"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        disable-pagination
      >
        <template #top>
          <div class="py-2 text-center text-overline font-weight-bold">
            <i18n tag="span" path="titles.lastTxs">
              <span v-text="TRANSACTIONS.AMOUNT_TO_LOAD" />
            </i18n>
          </div>
        </template>
        <template #[`item.hash`]="{ item }">
          <router-link
            class="d-inline-block text-truncate text-decoration-none font-monotype"
            style="max-width: 12rem"
            v-text="item.hash"
            :to="{
              name: ROUTES.NAME.TRANSACTIONS_DETAIL,
              params: { id: item.hash },
            }"
          />
        </template>
        <template #[`item.types`]="{ item }">
          <span v-text="getType(item.msgs_number, item.types)" />
        </template>
        <template #[`item.result`]="{ item }">
          <span
            class="font-weight-bold"
            :class="item.result ? 'info--text' : 'error--text'"
            v-text="item.result ? $t('labels.success') : $t('labels.failed')"
          />
        </template>
        <template #[`item.fee_amount`]="{ item }">
          <span
            class="text-uppercase"
            v-text="getFee(item.fee_denom, item.fee_amount)"
          />
        </template>
        <template #[`item.height`]="{ item }">
          <router-link
            class="text-decoration-none"
            v-text="item.height"
            :to="{
              name: ROUTES.NAME.BLOCKS_DETAIL,
              params: { id: item.height },
            }"
          />
        </template>
        <template #[`item.timestamp`]="{ item }">
          <v-tooltip top>
            <template #activator="{ on }">
              <div v-on="on">
                <span v-text="formatTime(item.timestamp)" />
              </div>
            </template>
            <span v-text="formatDate(item.timestamp)" />
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import { ROUTES, TRANSACTIONS } from '@/constants';
import { coinAdapter, dateHandler } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsViewListTable',
  components: { BaseLoadingLinear },
  props: {
    txType: {
      type: String,
      default: '',
      note: 'The tx type to search',
    },
  },
  data() {
    return {
      ROUTES,
      TRANSACTIONS,
      sortBy: 'height',
      sortDesc: true,
    };
  },
  computed: {
    ...mapGetters('transactions', ['isRefreshing', 'transactions']),
    headers() {
      return [
        { text: this.$t('labels.hash'), value: 'hash', width: '25%' },
        { text: this.$t('labels.type'), value: 'types', width: '25%' },
        { text: this.$t('labels.result'), value: 'result', width: '10%' },
        { text: this.$t('labels.fee'), value: 'fee_amount', width: '15%' },
        { text: this.$t('labels.height'), value: 'height', width: '15%' },
        { text: this.$t('labels.time'), value: 'timestamp' },
      ];
    },
    items() {
      if (!this.txType) {
        return this.transactions;
      }
      return this.transactions.filter(
        (tx) => tx.types.indexOf(this.txType) > -1
      );
    },
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
    formatTime(timestamp) {
      return dateHandler.getFormattedDifference(
        new Date(timestamp),
        new Date()
      );
    },
    getFee(feeDenom, feeAmount) {
      if (feeDenom === TRANSACTIONS.MULTI_FEE) {
        return this.$t(`labels.${TRANSACTIONS.MULTI_FEE}`);
      }
      return coinAdapter.format({
        denom: feeDenom,
        amount: feeAmount,
      });
    },
    getType(msgs, types) {
      if (msgs > 1) {
        return this.$t(`labels.${TRANSACTIONS.MULTI_TYPE}`);
      }
      return types[0];
    },
  },
};
</script>
