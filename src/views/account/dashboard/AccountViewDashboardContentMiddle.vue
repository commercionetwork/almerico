<template>
  <v-row class="mt-1">
    <v-col cols="12" md="6">
      <account-view-dashboard-chart-capitalization
        :capitalization="capital.capitalization"
      />
    </v-col>
    <v-col cols="12" md="6">
      <account-view-dashboard-capitalization
        :capitalization="capital.capitalization"
        :params="stakingParams"
      />
    </v-col>
    <v-col cols="12" md="6">
      <account-view-dashboard-delegations
        :delegations="delegations"
        :params="stakingParams"
        :validators="validators"
      />
    </v-col>
    <v-col cols="12" md="6">
      <account-view-dashboard-unbonding-delegations
        :unbondings="unbondings"
        :params="stakingParams"
        :validators="validators"
      />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewDashboardChartCapitalization from './AccountViewDashboardChartCapitalization.vue';
import AccountViewDashboardCapitalization from './AccountViewDashboardCapitalization.vue';
import AccountViewDashboardDelegations from './AccountViewDashboardDelegations.vue';
import AccountViewDashboardUnbondingDelegations from './AccountViewDashboardUnbondingDelegations.vue';

import accountBalanceHelper from '../helpers/accountBalanceHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountViewDashboardContentMiddle',
  components: {
    AccountViewDashboardChartCapitalization,
    AccountViewDashboardCapitalization,
    AccountViewDashboardDelegations,
    AccountViewDashboardUnbondingDelegations,
  },
  computed: {
    ...mapGetters('application', ['stakingParams', 'validators']),
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
