<template>
  <v-row>
    <v-col cols="12" md="4">
      <LatestHeightComponent />
    </v-col>
    <v-col cols="12" md="4">
      <BlocksListChartComponent />
    </v-col>
    <v-col cols="12" md="4">
      <BlocksListSearchComponent />
    </v-col>
  </v-row>
</template>

<script>
import BlocksListChartComponent from './BlocksListChartComponent.vue';
import BlocksListSearchComponent from './BlocksListSearchComponent.vue';
import LatestHeightComponent from '@/components/LatestHeightComponent';

export default {
  name: 'BlocksListTopContentComponent',
  components: {
    BlocksListChartComponent,
    BlocksListSearchComponent,
    LatestHeightComponent,
  },
};
</script>
