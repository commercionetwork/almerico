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
        :params="params"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountViewDelegations
        :delegations="delegations"
        :params="params"
        :validators="validators"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountViewUnbondings
        :unbondings="unbondings"
        :params="params"
        :validators="validators"
      />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewChartCapitalization from './AccountViewChartCapitalization.vue';
import AccountViewCapitalization from './AccountViewCapitalization.vue';
import AccountViewDelegations from './AccountViewDelegations.vue';
import AccountViewUnbondings from './AccountViewUnbondings.vue';

import accountBalanceHelper from './helpers/accountBalanceHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountViewContentMiddle',
  components: {
    AccountViewChartCapitalization,
    AccountViewCapitalization,
    AccountViewDelegations,
    AccountViewUnbondings,
  },
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
      validators: 'validators',
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
