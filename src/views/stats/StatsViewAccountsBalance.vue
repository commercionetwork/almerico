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
      <the-error-message :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <the-header-content :title="$t('titles.accountsBalance')" />
      <stats-view-accounts-balance-list :wallets="wallets" />
    </v-col>
  </v-row>
</template>

<script>
import StatsViewAccountsBalanceList from './accounts-balance/StatsViewAccountsBalanceList.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'StatsViewAccountsBalance',
  components: { StatsViewAccountsBalanceList },
  computed: {
    ...mapGetters('stats', ['error', 'isLoading', 'wallets']),
  },
  created() {
    this.initAccountsBalance();
  },
  methods: {
    ...mapActions('stats', ['initAccountsBalance']),
  },
};
</script>
