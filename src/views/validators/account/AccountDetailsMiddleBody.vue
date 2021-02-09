<template>
  <v-layout>
    <v-row>
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
import AccountDetailsBalance from './AccountDetailsBalance';
import AccountDetailsDelegations from './AccountDetailsDelegations';
import AccountDetailsUnbondings from './AccountDetailsUnbondings';

import { mapGetters } from 'vuex';

export default {
  name: 'AccountDetailsMiddleBody',
  components: {
    AccountDetailsBalance,
    AccountDetailsDelegations,
    AccountDetailsUnbondings,
  },
  computed: {
    ...mapGetters('account', {
      balances: 'balances',
    }),
  },
};
</script>
