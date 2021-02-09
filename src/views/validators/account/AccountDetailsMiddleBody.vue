<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="4">
        <AccountDetailsCapitalization :amounts="amounts" />
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
import AccountDetailsCapitalization from './AccountDetailsCapitalization';
import AccountDetailsDelegations from './AccountDetailsDelegations';
import AccountDetailsUnbondings from './AccountDetailsUnbondings';

import { mapGetters } from 'vuex';
import { AccountStakeHandler } from '@/utils';

export default {
  name: 'AccountDetailsMiddleBody',
  components: {
    AccountDetailsCapitalization,
    AccountDetailsDelegations,
    AccountDetailsUnbondings,
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
