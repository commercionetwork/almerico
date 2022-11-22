<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <BaseLoadingLinear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <TheAlertNotice kind="warning" :message="$t('msgs.accountNotExist')" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <TheHeaderContent :title="$t('titles.accountBalance')" />
      <AccountViewBalanceContentTop />
      <AccountViewBalanceTable />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewBalanceTable from './balance/AccountViewBalanceTable.vue';
import AccountViewBalanceContentTop from './balance/AccountViewBalanceContentTop.vue';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheAlertNotice from '@/components/TheAlertNotice.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { ROUTES } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccountViewBalance',
  components: {
    AccountViewBalanceTable,
    AccountViewBalanceContentTop,
    BaseLoadingLinear,
    TheAlertNotice,
    TheHeaderContent,
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
