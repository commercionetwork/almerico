<template>
  <v-row v-if="isRefreshing" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent />
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
        <template v-slot:top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="title"
          />
        </template>
        <template v-slot:[`item.height`]="{ item }">
          <router-link
            class="text-decoration-none"
            v-text="item.height"
            :to="{
              name: ROUTES.NAME.BLOCKS_DETAIL,
              params: { id: item.height },
            }"
          />
        </template>
        <template v-slot:[`item.result`]="{ item }">
          <span
            class="font-weight-bold"
            :class="item.result ? 'info--text' : 'error--text'"
            v-text="item.result ? $t('labels.success') : $t('labels.failed')"
          />
        </template>
        <template v-slot:[`item.fee`]="{ item }">
          <span class="text-uppercase" v-text="item.fee" />
        </template>
        <template v-slot:[`item.hash`]="{ item }">
          <router-link
            class="d-inline-block text-truncate text-decoration-none font-monotype"
            style="max-width: 120px"
            v-text="item.hash"
            :to="{
              name: ROUTES.NAME.TRANSACTIONS_DETAIL,
              params: { id: item.hash },
            }"
          />
        </template>
        <template v-slot:[`item.time`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
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
      <LoadingLinearComponent v-if="isAdding" data-test="scrolling" />
    </v-col>
  </v-row>
</template>

<script>
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { ROUTES } from '@/constants';
import { mapActions, mapGetters } from 'vuex';
import transactionsTableAdapter from './helpers/transactionsTableAdapter';

export default {
  name: 'TransactionsListTableComponent',
  components: {
    LoadingLinearComponent,
  },
  props: {
    txType: {
      type: String,
      default: '',
      note: 'The tx type to search',
    },
  },
  data: () => ({
    ROUTES,
    sortBy: 'height',
    sortDesc: true,
  }),
  computed: {
    ...mapGetters('transactions', {
      isAdding: 'isAddingTxs',
      isRefreshing: 'isRefreshing',
      offset: 'offset',
      total: 'total',
      transactions: 'transactions',
    }),
    headers() {
      return [
        { text: this.$t('labels.height'), value: 'height' },
        { text: this.$t('labels.type'), value: 'type' },
        { text: this.$t('labels.result'), value: 'result' },
        { text: this.$t('labels.fee'), value: 'fee' },
        { text: this.$t('labels.hash'), value: 'hash' },
        { text: this.$t('labels.date'), value: 'date' },
        { text: this.$t('labels.time'), value: 'time' },
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
    ...mapActions('transactions', {
      addTransactions: 'addTransactions',
    }),
    onIntersect(_entries, _observer, isIntersecting) {
      if (isIntersecting && this.total > this.offset) {
        this.addTransactions({ query: this.query, offset: this.offset });
      }
    },
  },
};
</script>
