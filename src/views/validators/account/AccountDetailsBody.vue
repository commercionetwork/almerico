<template>
  <v-row>
    <v-col cols="12">
      <AccountDetailsAddress />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsBank :balances="balances" />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsBalanceChart :amounts="amounts" />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsChart :amounts="amounts" />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsCapitalization :amounts="amounts" />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsDelegations />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsUnbondings />
    </v-col>
  </v-row>
</template>

<script>
import AccountDetailsAddress from './AccountDetailsAddress';
import AccountDetailsBalanceChart from './AccountDetailsBalanceChart';
import AccountDetailsBank from './AccountDetailsBank';
import AccountDetailsCapitalization from './AccountDetailsCapitalization';
import AccountDetailsChart from './AccountDetailsChart';
import AccountDetailsDelegations from './AccountDetailsDelegations';
import AccountDetailsUnbondings from './AccountDetailsUnbondings';

import { mapGetters } from 'vuex';
import { AccountBalanceHandler } from '@/utils';

export default {
  name: 'AccountDetailsBody',
  components: {
    AccountDetailsAddress,
    AccountDetailsBalanceChart,
    AccountDetailsBank,
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
    ...mapGetters('starting', {
      params: 'params',
    }),
    amounts() {
      const balanceHandler = new AccountBalanceHandler({
        delegations: this.delegations,
        rewards: this.rewards,
        unbondings: this.unbondings,
        balances: this.balances,
        bondDenom: this.params.bond_denom,
      });
      return balanceHandler.build();
    },
  },
};
</script>
