<template>
  <v-row>
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
            v-text="$t('titles.allTypesTransactions')"
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
            class="
              d-inline-block
              text-truncate text-decoration-none
              font-monotype
            "
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
      <LoadingLinearComponent v-if="isAdding" />
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
  data: () => ({
    ROUTES,
    sortBy: 'height',
    sortDesc: true,
  }),
  computed: {
    ...mapGetters('transactions', {
      isAdding: 'isAddingTxs',
      nextKey: 'nextKey',
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
  },
  methods: {
    ...mapActions('transactions', {
      addTransactions: 'addTransactions',
    }),
    onIntersect(_entries, _observer, isIntersecting) {
      if (this.nextKey && isIntersecting) {
        this.addTransactions(this.nextKey);
      }
    },
  },
};
</script>
