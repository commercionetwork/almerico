<template>
  <v-row>
    <v-col cols="12" md="4">
      <ValidatorsDetailDelegationsComponent
        :delegations="processedDelegations"
      />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsDetailChartComponent :delegations="processedDelegations" />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsDetailDelegatorsComponent :account="account" />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsDetailChartComponent from './ValidatorsDetailChartComponent.vue';
import ValidatorsDetailDelegationsComponent from './ValidatorsDetailDelegationsComponent.vue';
import ValidatorsDetailDelegatorsComponent from './ValidatorsDetailDelegatorsComponent.vue';

import validatorsDetailDelegationsHelper from './helpers/validatorsDetailDelegationsHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsDetailBodyContentComponent',
  components: {
    ValidatorsDetailChartComponent,
    ValidatorsDetailDelegationsComponent,
    ValidatorsDetailDelegatorsComponent,
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
        this.account,
      );
    },
  },
};
</script>
