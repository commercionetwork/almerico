<template>
  <v-row>
    <v-col cols="12" md="4">
      <AccountViewContentTopLeft />
    </v-col>
    <v-col cols="12" md="4">
      <AccountViewContentTopCenter :assets="capital.assets" />
    </v-col>
    <v-col cols="12" md="4">
      <AccountViewContentTopRight :balances="balances" />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewContentTopLeft from './AccountViewContentTopLeft.vue';
import AccountViewContentTopRight from './AccountViewContentTopRight.vue';
import AccountViewContentTopCenter from './AccountViewContentTopCenter.vue';

import accountBalanceHelper from './helpers/accountBalanceHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountViewContentTop',
  components: {
    AccountViewContentTopLeft,
    AccountViewContentTopRight,
    AccountViewContentTopCenter,
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
