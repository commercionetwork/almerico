<template>
  <v-row>
    <v-col cols="12" md="4">
      <validators-view-detail-delegated-tokens
        :delegations="processedDelegations"
      />
    </v-col>
    <v-col cols="12" md="4">
      <validators-view-detail-chart :delegations="processedDelegations" />
    </v-col>
    <v-col cols="12" md="4">
      <validators-view-detail-delegator-amounts />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewDetailChart from './ValidatorsViewDetailChart.vue';
import ValidatorsViewDetailDelegatedTokens from './ValidatorsViewDetailDelegatedTokens.vue';
import ValidatorsViewDetailDelegatorAmounts from './ValidatorsViewDetailDelegatorAmounts.vue';

import validatorsDetailDelegationsHelper from './helpers/validatorsDetailDelegationsHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetailContentBottom',
  components: {
    ValidatorsViewDetailChart,
    ValidatorsViewDetailDelegatedTokens,
    ValidatorsViewDetailDelegatorAmounts,
  },
  computed: {
    ...mapGetters('validators', ['detail', 'delegations']),
    processedDelegations() {
      return validatorsDetailDelegationsHelper.build(
        this.delegations,
        this.detail.account
      );
    },
  },
};
</script>
