<template>
  <v-row>
    <v-col cols="12" :md="isBlocksMonitor ? 4 : 6">
      <ValidatorsViewDetailContentTopLeft />
    </v-col>
    <v-col cols="12" :md="isBlocksMonitor ? 4 : 6">
      <ValidatorsViewDetailContentTopCenter />
    </v-col>
    <v-col v-if="isBlocksMonitor" cols="12" md="4">
      <ValidatorsViewDetailContentTopRight />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewDetailContentTopRight from './ValidatorsViewDetailContentTopRight.vue';
import ValidatorsViewDetailContentTopLeft from './ValidatorsViewDetailContentTopLeft.vue';
import ValidatorsViewDetailContentTopCenter from './ValidatorsViewDetailContentTopCenter.vue';

import { VALIDATORS } from '@/constants';

export default {
  name: 'ValidatorsViewDetailContentTop',
  components: {
    ValidatorsViewDetailContentTopRight,
    ValidatorsViewDetailContentTopLeft,
    ValidatorsViewDetailContentTopCenter,
  },
  computed: {
    isBlocksMonitor() {
      return VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY;
    },
  },
};
</script>
