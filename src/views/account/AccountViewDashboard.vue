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
      <TheHeaderContent :title="$t('titles.accountDetail')" />
      <AccountViewDashboardContentTop />
      <AccountViewDashboardContentMiddle />
      <AccountViewDashboardContentBottom />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewDashboardContentBottom from './dashboard/AccountViewDashboardContentBottom.vue';
import AccountViewDashboardContentMiddle from './dashboard/AccountViewDashboardContentMiddle.vue';
import AccountViewDashboardContentTop from './dashboard/AccountViewDashboardContentTop.vue';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheAlertNotice from '@/components/TheAlertNotice.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccountViewDashboard',
  components: {
    AccountViewDashboardContentBottom,
    AccountViewDashboardContentMiddle,
    AccountViewDashboardContentTop,
    BaseLoadingLinear,
    TheAlertNotice,
    TheHeaderContent,
  },
  provide() {
    return {
      address: this.id,
    };
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
