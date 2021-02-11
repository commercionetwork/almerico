<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="4">
        <AccountDetailsAddress />
      </v-col>
      <v-col cols="12" md="4">
        <AccountDetailsChart :amounts="amounts" />
      </v-col>
      <v-col cols="12" md="4">
        <AccountDetailsCapitalization :amounts="amounts" />
      </v-col>
      <v-col cols="12" md="4">
        <AccountDetailsBalance :balances="balances" />
      </v-col>
      <v-col cols="12" md="4">
        <AccountDetailsDelegations />
      </v-col>
      <v-col cols="12" md="4">
        <AccountDetailsUnbondings />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import AccountDetailsAddress from './AccountDetailsAddress';
import AccountDetailsBalance from './AccountDetailsBalance';
import AccountDetailsCapitalization from './AccountDetailsCapitalization';
import AccountDetailsChart from './AccountDetailsChart';
import AccountDetailsDelegations from './AccountDetailsDelegations';
import AccountDetailsUnbondings from './AccountDetailsUnbondings';

import { mapGetters } from 'vuex';
import { AccountStakeHandler } from '@/utils';

export default {
  name: 'AccountDetailsBody',
  components: {
    AccountDetailsAddress,
    AccountDetailsBalance,
    AccountDetailsCapitalization,
    AccountDetailsChart,
    AccountDetailsDelegations,
    AccountDetailsUnbondings,
  },
  computed: {
    ...mapGetters('account', {
      balances: 'balances',
      delegations: 'delegations',
      rewards: 'rewards',
      unbondings: 'unbondings',
    }),

    amounts() {
      return AccountStakeHandler.setDelegations(this.delegations)
        .setRewards(this.rewards)
        .setUnbondings(this.unbondings)
        .get();
    },
  },
};
</script>
