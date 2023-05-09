<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <base-loading-linear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <the-alert-notice kind="warning" :message="$t('msgs.accountNotExist')" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <the-header-content :title="$t('titles.accountBalance')" />
      <account-view-balance-content-top />
      <account-view-balance-table />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewBalanceTable from './balance/AccountViewBalanceTable.vue';
import AccountViewBalanceContentTop from './balance/AccountViewBalanceContentTop.vue';

import { ROUTES } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccountViewBalance',
  components: {
    AccountViewBalanceTable,
    AccountViewBalanceContentTop,
  },
  props: {
    id: {
      type: String,
      note: "The account id from route's parameter",
    },
  },
  computed: {
    ...mapGetters('accountBalance', ['error', 'isLoading']),
    routeBack() {
      return { name: ROUTES.NAME.ACCOUNT, params: { id: this.id } };
    },
  },
  created() {
    this.initAllBalancesDashboard(this.id);
  },
  methods: {
    ...mapActions('accountBalance', ['initAllBalancesDashboard']),
  },
};
</script>
