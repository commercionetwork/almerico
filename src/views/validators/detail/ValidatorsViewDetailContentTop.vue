<template>
  <v-row>
    <v-col cols="12" md="4">
      <validators-view-detail-identity />
    </v-col>
    <v-col cols="12" md="4">
      <validators-view-detail-attributes />
    </v-col>
    <v-col cols="12" md="4">
      <validators-view-detail-blocks-monitor />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewDetailBlocksMonitor from './ValidatorsViewDetailBlocksMonitor.vue';
import ValidatorsViewDetailIdentity from './ValidatorsViewDetailIdentity.vue';
import ValidatorsViewDetailAttributes from './ValidatorsViewDetailAttributes.vue';

export default {
  name: 'ValidatorsViewDetailContentTop',
  components: {
    ValidatorsViewDetailBlocksMonitor,
    ValidatorsViewDetailIdentity,
    ValidatorsViewDetailAttributes,
  },
};
</script>
