<template>
  <v-row>
    <v-col cols="12" md="4">
      <AccountIdentity />
    </v-col>
    <v-col cols="12" md="4">
      <AccountViewDashboardChartPerformance :assets="capital.assets" />
    </v-col>
    <v-col cols="12" md="4">
      <AccountTokensBalance :balances="balances">
        <template>
          <v-btn color="primary" depressed :to="toBalance">
            <span class="px-3" v-text="$t('labels.showAll')" />
          </v-btn>
        </template>
      </AccountTokensBalance>
    </v-col>
  </v-row>
</template>

<script>
import AccountIdentity from '../common/AccountIdentity.vue';
import AccountTokensBalance from '../common/AccountTokensBalance.vue';
import AccountViewDashboardChartPerformance from './AccountViewDashboardChartPerformance.vue';

import accountBalanceHelper from '../helpers/accountBalanceHelper';
import { ROUTES } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountViewDashboardContentTop',
  components: {
    AccountIdentity,
    AccountTokensBalance,
    AccountViewDashboardChartPerformance,
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
    address() {
      return this.$route.params.id;
    },
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
    toBalance() {
      return {
        name: ROUTES.NAME.ACCOUNT_BALANCE,
        params: { id: this.address },
      };
    },
  },
};
</script>
