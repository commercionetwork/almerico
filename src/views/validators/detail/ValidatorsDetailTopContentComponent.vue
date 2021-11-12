<template>
  <v-row>
    <v-col cols="12" :md="isBlocksMonitor ? 4 : 6">
      <ValidatorsDetailMonikerComponent :account="account" />
    </v-col>
    <v-col cols="12" :md="isBlocksMonitor ? 4 : 6">
      <ValidatorsDetailSpecComponent />
    </v-col>
    <v-col v-if="isBlocksMonitor" cols="12" md="4">
      <ValidatorsDetailBlocksComponent />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsDetailBlocksComponent from './ValidatorsDetailBlocksComponent.vue';
import ValidatorsDetailMonikerComponent from './ValidatorsDetailMonikerComponent.vue';
import ValidatorsDetailSpecComponent from './ValidatorsDetailSpecComponent.vue';

import { VALIDATORS } from '@/constants';

export default {
  name: 'ValidatorsDetailTopContentComponent',
  components: {
    ValidatorsDetailBlocksComponent,
    ValidatorsDetailMonikerComponent,
    ValidatorsDetailSpecComponent,
  },
  props: {
    account: {
      type: String,
      required: true,
      note: 'The account address',
    },
  },
  computed: {
    isBlocksMonitor() {
      return VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY;
    },
  },
};
</script>
