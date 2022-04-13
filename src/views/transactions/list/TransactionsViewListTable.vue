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
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="title"
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
        <template #[`item.result`]="{ item }">
          <span
            class="font-weight-bold"
            :class="item.result ? 'info--text' : 'error--text'"
            v-text="item.result ? $t('labels.success') : $t('labels.failed')"
          />
        </template>
        <template #[`item.fee`]="{ item }">
          <span class="text-uppercase" v-text="item.fee" />
        </template>
        <template #[`item.hash`]="{ item }">
          <router-link
            class="d-inline-block text-truncate text-decoration-none font-monotype"
            style="max-width: 15rem"
            v-text="item.hash"
            :to="{
              name: ROUTES.NAME.TRANSACTIONS_DETAIL,
              params: { id: item.hash },
            }"
          />
        </template>
        <template #[`item.time`]="{ item }">
          <v-tooltip top>
            <template #activator="{ on }">
              <div v-on="on">
                <span v-text="item.time" />
              </div>
            </template>
            <span v-text="item.date" />
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0.5],
        },
      }"
    >
      <BaseLoadingLinear v-if="isAddingTxs" data-test="scrolling" />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import { ROUTES } from '@/constants';
import { mapActions, mapGetters } from 'vuex';
import transactionsTableAdapter from './helpers/transactionsTableAdapter';

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
      sortBy: 'height',
      sortDesc: true,
    };
  },
  computed: {
    ...mapGetters('transactions', [
      'isAddingTxs',
      'isRefreshing',
      'offset',
      'total',
      'transactions',
    ]),
    headers() {
      return [
        { text: this.$t('labels.height'), value: 'height' },
        { text: this.$t('labels.type'), value: 'type', width: '22%' },
        { text: this.$t('labels.result'), value: 'result', width: '10%' },
        { text: this.$t('labels.fee'), value: 'fee', width: '10%' },
        { text: this.$t('labels.hash'), value: 'hash', width: '23%' },
        { text: this.$t('labels.date'), value: 'date', width: '15%' },
        { text: this.$t('labels.time'), value: 'time', width: '10%' },
      ];
    },
    items() {
      return transactionsTableAdapter.build({
        txs: this.transactions,
        labels: {
          multiTypes: this.$t('labels.multiTypes'),
          multiValues: this.$t('labels.multiValues'),
        },
      });
    },
    query() {
      return !this.txType
        ? 'tx.height >= 1'
        : `message.action='${this.txType}'`;
    },
    title() {
      return !this.txType
        ? this.$t('titles.allTypesTransactions')
        : `${this.$t('titles.txType')}: ${this.txType}`;
    },
  },
  methods: {
    ...mapActions('transactions', ['addTransactions']),
    onIntersect(_entries, _observer, isIntersecting) {
      if (isIntersecting && this.total > this.offset) {
        this.addTransactions({ query: this.query, offset: this.offset });
      }
    },
  },
};
</script>
