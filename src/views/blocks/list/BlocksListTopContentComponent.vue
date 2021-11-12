<template>
  <v-row>
    <v-col cols="12" md="4">
      <LatestHeightComponent />
    </v-col>
    <v-col cols="12" md="4">
      <BlocksListChartComponent />
    </v-col>
    <v-col cols="12" md="4">
      <v-card outlined>
        <v-card-title>COMING SOON</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LatestHeightComponent from '@/components/LatestHeightComponent';
import BlocksListChartComponent from './BlocksListChartComponent.vue';

export default {
  name: 'BlocksListTopContentComponent',
  components: {
    BlocksListChartComponent,
    LatestHeightComponent,
  },
};
</script>
