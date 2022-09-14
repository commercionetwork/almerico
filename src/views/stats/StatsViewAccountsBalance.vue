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
      <TheErrorMessage :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <TheHeaderContent :title="$t('titles.accountsBalance')" />
      <StatsViewAccountsBalanceList :wallets="wallets" />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import StatsViewAccountsBalanceList from './accounts-balance/StatsViewAccountsBalanceList.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'StatsViewAccountsBalance',
  components: {
    BaseLoadingLinear,
    StatsViewAccountsBalanceList,
    TheErrorMessage,
    TheHeaderContent,
  },
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
