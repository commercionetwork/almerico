<template>
  <v-row>
    <v-col cols="12" md="4">
      <TheLatestHeight />
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
import TheLatestHeight from '@/components/TheLatestHeight';

export default {
  name: 'BlocksListTopContentComponent',
  components: {
    BlocksListChartComponent,
    BlocksListSearchComponent,
    TheLatestHeight,
  },
};
</script>
