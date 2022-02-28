<template>
  <v-row>
    <v-col cols="12" md="4">
      <TheLatestHeight />
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
import TheLatestHeight from '@/components/TheLatestHeight';
import ValidatorsListChartComponent from './ValidatorsListChartComponent.vue';
import ValidatorsListSearchComponent from './ValidatorsListSearchComponent.vue';

export default {
  name: 'ValidatorsListTopContentComponent',
  components: {
    TheLatestHeight,
    ValidatorsListChartComponent,
    ValidatorsListSearchComponent,
  },
};
</script>
