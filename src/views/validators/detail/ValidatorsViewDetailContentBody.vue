<template>
  <v-row>
    <v-col cols="12" md="4">
      <ValidatorsViewDetailDelegations :delegations="processedDelegations" />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsViewDetailChart :delegations="processedDelegations" />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsViewDetailDelegators :account="account" />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewDetailChart from './ValidatorsViewDetailChart.vue';
import ValidatorsViewDetailDelegations from './ValidatorsViewDetailDelegations.vue';
import ValidatorsViewDetailDelegators from './ValidatorsViewDetailDelegators.vue';

import validatorsDetailDelegationsHelper from './helpers/validatorsDetailDelegationsHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetailContentBody',
  components: {
    ValidatorsViewDetailChart,
    ValidatorsViewDetailDelegations,
    ValidatorsViewDetailDelegators,
  },
  props: {
    account: {
      type: String,
      required: true,
      note: 'The account address',
    },
  },
  computed: {
    ...mapGetters('validators', {
      delegations: 'delegations',
    }),
    processedDelegations() {
      return validatorsDetailDelegationsHelper.build(
        this.delegations,
        this.account
      );
    },
  },
};
</script>
