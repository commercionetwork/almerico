<template>
  <v-row>
    <v-col cols="12" md="4">
      <AccountViewIdentity />
    </v-col>
    <v-col cols="12" md="4">
      <AccountViewChartPerformance :assets="capital.assets" />
    </v-col>
    <v-col cols="12" md="4">
      <AccountViewTokensBalance :balances="balances" />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewIdentity from './AccountViewIdentity.vue';
import AccountViewTokensBalance from './AccountViewTokensBalance.vue';
import AccountViewChartPerformance from './AccountViewChartPerformance.vue';

import accountBalanceHelper from './helpers/accountBalanceHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountViewContentTop',
  components: {
    AccountViewIdentity,
    AccountViewTokensBalance,
    AccountViewChartPerformance,
  },
  computed: {
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('account', [
      'balances',
      'commission',
      'delegations',
      'rewards',
      'unbondings',
    ]),
    capital() {
      return accountBalanceHelper.build({
        balances: this.balances,
        commission: this.commission,
        delegations: this.delegations,
        rewards: this.rewards,
        unbondings: this.unbondings,
        bondDenom: this.stakingParams.bond_denom,
      });
    },
  },
};
</script>
