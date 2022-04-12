<template>
  <v-row class="mt-1">
    <v-col cols="12" md="6">
      <AccountViewChartCapitalization
        :capitalization="capital.capitalization"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountViewCapitalization
        :capitalization="capital.capitalization"
        :params="stakingParams"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountViewDelegations
        :delegations="delegations"
        :params="stakingParams"
        :validators="validators"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountViewUnbondingDelegations
        :unbondings="unbondings"
        :params="stakingParams"
        :validators="validators"
      />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewChartCapitalization from './AccountViewChartCapitalization.vue';
import AccountViewCapitalization from './AccountViewCapitalization.vue';
import AccountViewDelegations from './AccountViewDelegations.vue';
import AccountViewUnbondingDelegations from './AccountViewUnbondingDelegations.vue';

import accountBalanceHelper from './helpers/accountBalanceHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountViewContentMiddle',
  components: {
    AccountViewChartCapitalization,
    AccountViewCapitalization,
    AccountViewDelegations,
    AccountViewUnbondingDelegations,
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
