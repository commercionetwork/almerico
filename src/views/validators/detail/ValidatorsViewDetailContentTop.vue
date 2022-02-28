<template>
  <v-row>
    <v-col cols="12" :md="isBlocksMonitor ? 4 : 6">
      <ValidatorsViewDetailAddress :account="account" />
    </v-col>
    <v-col cols="12" :md="isBlocksMonitor ? 4 : 6">
      <ValidatorsViewDetailParticulars />
    </v-col>
    <v-col v-if="isBlocksMonitor" cols="12" md="4">
      <ValidatorsViewDetailBlocks />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewDetailBlocks from './ValidatorsViewDetailBlocks.vue';
import ValidatorsViewDetailAddress from './ValidatorsViewDetailAddress.vue';
import ValidatorsViewDetailParticulars from './ValidatorsViewDetailParticulars.vue';

import { VALIDATORS } from '@/constants';

export default {
  name: 'ValidatorsViewDetailContentTop',
  components: {
    ValidatorsViewDetailBlocks,
    ValidatorsViewDetailAddress,
    ValidatorsViewDetailParticulars,
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
