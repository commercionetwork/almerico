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
      <the-header-content :title="$t('titles.accountDetail')" />
      <account-view-dashboard-content-top />
      <account-view-dashboard-content-middle />
      <account-view-dashboard-content-bottom />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewDashboardContentBottom from './dashboard/AccountViewDashboardContentBottom.vue';
import AccountViewDashboardContentMiddle from './dashboard/AccountViewDashboardContentMiddle.vue';
import AccountViewDashboardContentTop from './dashboard/AccountViewDashboardContentTop.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccountViewDashboard',
  components: {
    AccountViewDashboardContentBottom,
    AccountViewDashboardContentMiddle,
    AccountViewDashboardContentTop,
  },
  props: {
    id: {
      type: String,
      note: "The account id from route's parameter",
    },
  },
  computed: {
    ...mapGetters('account', ['error', 'isLoading']),
  },
  watch: {
    id(value) {
      this.initAccountDashboard(value);
    },
  },
  created() {
    this.initAccountDashboard(this.id);
  },
  methods: {
    ...mapActions('account', ['initAccountDashboard']),
  },
};
</script>
