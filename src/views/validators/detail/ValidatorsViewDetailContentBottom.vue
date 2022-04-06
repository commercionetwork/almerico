<template>
  <v-row>
    <v-col cols="12" md="4">
      <ValidatorsViewDetailContentBottomLeft
        :delegations="processedDelegations"
      />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsViewDetailContentBottomCenter
        :delegations="processedDelegations"
      />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsViewDetailContentBottomRight />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewDetailContentBottomCenter from './ValidatorsViewDetailContentBottomCenter.vue';
import ValidatorsViewDetailContentBottomLeft from './ValidatorsViewDetailContentBottomLeft.vue';
import ValidatorsViewDetailContentBottomRight from './ValidatorsViewDetailContentBottomRight.vue';

import validatorsDetailDelegationsHelper from './helpers/validatorsDetailDelegationsHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetailContentBottom',
  components: {
    ValidatorsViewDetailContentBottomCenter,
    ValidatorsViewDetailContentBottomLeft,
    ValidatorsViewDetailContentBottomRight,
  },
  computed: {
    ...mapGetters('validators', ['account', 'delegations']),
    processedDelegations() {
      return validatorsDetailDelegationsHelper.build(
        this.delegations,
        this.account
      );
    },
  },
};
</script>
