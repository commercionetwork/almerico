<template>
  <v-row class="mt-1">
    <v-col cols="12" md="6">
      <AccountViewContentMiddleTopLeft
        :capitalization="capital.capitalization"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountViewContentMiddleTopRight
        :capitalization="capital.capitalization"
        :params="stakingParams"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountViewContentMiddleBottomLeft
        :delegations="delegations"
        :params="stakingParams"
        :validators="validators"
      />
    </v-col>
    <v-col cols="12" md="6">
      <AccountViewContentMiddleBottomRight
        :unbondings="unbondings"
        :params="stakingParams"
        :validators="validators"
      />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewContentMiddleTopLeft from './AccountViewContentMiddleTopLeft.vue';
import AccountViewContentMiddleTopRight from './AccountViewContentMiddleTopRight.vue';
import AccountViewContentMiddleBottomLeft from './AccountViewContentMiddleBottomLeft.vue';
import AccountViewContentMiddleBottomRight from './AccountViewContentMiddleBottomRight.vue';

import accountBalanceHelper from './helpers/accountBalanceHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountViewContentMiddle',
  components: {
    AccountViewContentMiddleTopLeft,
    AccountViewContentMiddleTopRight,
    AccountViewContentMiddleBottomLeft,
    AccountViewContentMiddleBottomRight,
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
