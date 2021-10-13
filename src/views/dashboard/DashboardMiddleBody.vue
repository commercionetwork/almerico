<template>
  <v-layout>
    <v-flex>
      <v-row>
        <v-col cols="12">
          <h2 class="pt-3 text-h4" v-text="title" />
        </v-col>
      </v-row>
      <v-row v-if="isLoading" data-test="loading">
        <v-col cols="12" class="pa-5">
          <v-progress-linear
            indeterminate
            rounded
            color="primary"
            height="25"
            value="10"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row v-else-if="error !== null" data-test="error">
        <v-col cols="12">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1" v-text="JSON.stringify(error)" />
          </v-alert>
        </v-col>
      </v-row>
      <DashboardGridList
        v-else
        data-test="content"
        :txs="txs"
        :limit="CUSTOMIZATION.TXS.DASHBOARD_ITEMS"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import DashboardGridList from './DashboardGridList';

import { mapActions, mapGetters } from 'vuex';
import { CUSTOMIZATION } from '@/constants';

export default {
  name: 'DashboardMiddleBody',
  components: {
    DashboardGridList,
  },
  data: () => ({
    CUSTOMIZATION,
  }),
  computed: {
    ...mapGetters(['error']),
    ...mapGetters('transactions', {
      isLoading: 'isLoading',
      txs: 'transactions',
    }),
    title() {
      return `Last ${CUSTOMIZATION.TXS.DASHBOARD_ITEMS} transactions`;
    },
  },
  methods: {
    ...mapActions('transactions', {
      fetchTransactionsDescendingOrder: 'fetchTransactionsDescendingOrder',
    }),
  },
  created() {
    this.fetchTransactionsDescendingOrder({
      limit: CUSTOMIZATION.TXS.DASHBOARD_ITEMS,
    });
  },
};
</script>
