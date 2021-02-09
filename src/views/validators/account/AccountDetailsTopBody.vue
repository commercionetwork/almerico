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
        <AccountDetailsCapitalization :amounts="amounts" />
      </template>
    </TopBody>
  </v-layout>
</template>

<script>
import AccountDetailsAddress from './AccountDetailsAddress';
import AccountDetailsCapitalization from './AccountDetailsCapitalization';
import AccountDetailsChart from './AccountDetailsChart';
import TopBody from '@/components/TopBody';

import { mapGetters } from 'vuex';
import { AccountStakeHandler } from '@/utils';

export default {
  name: 'AccountDetailsTopBody',
  components: {
    AccountDetailsAddress,
    AccountDetailsCapitalization,
    AccountDetailsChart,
    TopBody,
  },
  computed: {
    ...mapGetters('account', {
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
