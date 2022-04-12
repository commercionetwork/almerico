<template>
  <v-row>
    <v-col cols="12" :md="isBlocksMonitor ? 4 : 6">
      <ValidatorsViewDetailIdentity />
    </v-col>
    <v-col cols="12" :md="isBlocksMonitor ? 4 : 6">
      <ValidatorsViewDetailAttributes />
    </v-col>
    <v-col v-if="isBlocksMonitor" cols="12" md="4">
      <ValidatorsViewDetailBlocksMonitor />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewDetailBlocksMonitor from './ValidatorsViewDetailBlocksMonitor.vue';
import ValidatorsViewDetailIdentity from './ValidatorsViewDetailIdentity.vue';
import ValidatorsViewDetailAttributes from './ValidatorsViewDetailAttributes.vue';

import { VALIDATORS } from '@/constants';

export default {
  name: 'ValidatorsViewDetailContentTop',
  components: {
    ValidatorsViewDetailBlocksMonitor,
    ValidatorsViewDetailIdentity,
    ValidatorsViewDetailAttributes,
  },
  computed: {
    isBlocksMonitor() {
      return VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY;
    },
  },
};
</script>
