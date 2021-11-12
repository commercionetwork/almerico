<template>
  <v-row>
    <v-col cols="12" md="4">
      <LatestHeightComponent />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsListChartComponent />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsListSearchComponent />
    </v-col>
  </v-row>
</template>

<script>
import LatestHeightComponent from '@/components/LatestHeightComponent';
import ValidatorsListChartComponent from './ValidatorsListChartComponent.vue';
import ValidatorsListSearchComponent from './ValidatorsListSearchComponent.vue';

export default {
  name: 'ValidatorsListTopContentComponent',
  components: {
    LatestHeightComponent,
    ValidatorsListChartComponent,
    ValidatorsListSearchComponent,
  },
};
</script>
