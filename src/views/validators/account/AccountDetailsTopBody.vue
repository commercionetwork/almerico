<template>
  <v-layout>
    <TopBody>
      <template v-slot:left>
        <AccountDetailsAddress />
      </template>
      <template v-slot:center>
        <AccountDetailsChart :amounts="amounts" />
      </template>
      <template v-slot:right>
        <AccountDetailsBalance :balances="balances" />
      </template>
    </TopBody>
  </v-layout>
</template>

<script>
import AccountDetailsAddress from './AccountDetailsAddress';
import AccountDetailsBalance from './AccountDetailsBalance';
import AccountDetailsChart from './AccountDetailsChart';
import TopBody from '@/components/TopBody';

import { mapGetters } from 'vuex';
import { AccountBalanceHandler } from '@/utils';

export default {
  name: 'AccountDetailsTopBody',
  components: {
    AccountDetailsAddress,
    AccountDetailsBalance,
    AccountDetailsChart,
    TopBody,
  },
  computed: {
    ...mapGetters('account', {
      balances: 'balances',
      delegations: 'delegations',
      rewards: 'rewards',
      unbondings: 'unbondings',
    }),
    amounts() {
      return AccountBalanceHandler.setBalances(this.balances)
        .setDelegations(this.delegations)
        .setRewards(this.rewards)
        .setUnbondings(this.unbondings)
        .get();
    },
  },
};
</script>
