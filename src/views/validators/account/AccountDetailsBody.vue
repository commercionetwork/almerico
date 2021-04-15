<template>
  <v-row>
    <v-col cols="12">
      <AccountDetailsAddress />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsBank :balances="balances" />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsAssetsChart :assets="assets" />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsCapitalizationChart :capitalization="capitalization" />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDetailsCapitalization :capitalization="capitalization" />
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
import AccountDetailsAssetsChart from './AccountDetailsAssetsChart';
import AccountDetailsBank from './AccountDetailsBank';
import AccountDetailsCapitalization from './AccountDetailsCapitalization';
import AccountDetailsCapitalizationChart from './AccountDetailsCapitalizationChart';
import AccountDetailsDelegations from './AccountDetailsDelegations';
import AccountDetailsUnbondings from './AccountDetailsUnbondings';

import { mapGetters } from 'vuex';
import { AccountBalanceHandler } from '@/utils';

export default {
  name: 'AccountDetailsBody',
  components: {
    AccountDetailsAddress,
    AccountDetailsAssetsChart,
    AccountDetailsBank,
    AccountDetailsCapitalization,
    AccountDetailsCapitalizationChart,
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
      return new AccountBalanceHandler({
        delegations: this.delegations,
        rewards: this.rewards,
        unbondings: this.unbondings,
        balances: this.balances,
        bondDenom: this.params.bond_denom,
      }).build();
    },
    assets() {
      const amounts = { ...this.amounts };
      return amounts ? AccountBalanceHandler.filterAssets(amounts) : {};
    },
    capitalization() {
      const amounts = { ...this.amounts };
      return amounts ? AccountBalanceHandler.filterCapitalization(amounts) : {};
    },
  },
};
</script>
