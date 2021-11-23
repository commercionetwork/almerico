<template>
  <v-row>
    <v-col cols="12" md="4">
      <AccountAddressComponent />
    </v-col>
    <v-col cols="12" md="4">
      <AccountPerformanceChartComponent :assets="capital.assets" />
    </v-col>
    <v-col cols="12" md="4">
      <AccountBankComponent :balances="balances" />
    </v-col>
  </v-row>
</template>

<script>
import AccountAddressComponent from './AccountAddressComponent.vue';
import AccountBankComponent from './AccountBankComponent.vue';
import AccountPerformanceChartComponent from './AccountPerformanceChartComponent.vue';

import accountBalanceHelper from './helpers/accountBalanceHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountTopComponent',
  components: {
    AccountAddressComponent,
    AccountBankComponent,
    AccountPerformanceChartComponent,
  },
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
    ...mapGetters('account', {
      balances: 'balances',
      commission: 'commission',
      delegations: 'delegations',
      rewards: 'rewards',
      unbondings: 'unbondings',
    }),
    capital() {
      return accountBalanceHelper.build({
        balances: this.balances,
        commission: this.commission,
        delegations: this.delegations,
        rewards: this.rewards,
        unbondings: this.unbondings,
        bondDenom: this.params.bond_denom,
      });
    },
  },
};
</script>
