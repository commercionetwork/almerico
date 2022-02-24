<template>
  <v-row class="mt-1">
    <v-col cols="12" md="6">
      <AccountCapitalizationChartComponent
        :capitalization="capital.capitalization"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountCapitalizationComponent
        :capitalization="capital.capitalization"
        :params="params"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountDelegationsComponent
        :delegations="delegations"
        :params="params"
        :validators="validators"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountUnbondingsComponent
        :unbondings="unbondings"
        :params="params"
        :validators="validators"
      />
    </v-col>
  </v-row>
</template>

<script>
import AccountCapitalizationChartComponent from './AccountCapitalizationChartComponent.vue';
import AccountCapitalizationComponent from './AccountCapitalizationComponent.vue';
import AccountDelegationsComponent from './AccountDelegationsComponent.vue';
import AccountUnbondingsComponent from './AccountUnbondingsComponent.vue';

import accountBalanceHelper from './helpers/accountBalanceHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountMiddleComponent',
  components: {
    AccountCapitalizationChartComponent,
    AccountCapitalizationComponent,
    AccountDelegationsComponent,
    AccountUnbondingsComponent,
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
