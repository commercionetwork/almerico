<template>
  <v-row>
    <v-col cols="12" md="6">
      <AccountIdentity />
    </v-col>
    <v-col cols="12" md="6">
      <AccountTokensBalance :balances="balances" />
    </v-col>
  </v-row>
</template>

<script>
import AccountIdentity from '../common/AccountIdentity.vue';
import AccountTokensBalance from '../common/AccountTokensBalance.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'AccountViewBalanceContentTop',
  components: {
    AccountIdentity,
    AccountTokensBalance,
  },
  computed: {
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('account', ['balances']),
  },
};
</script>
