<template>
  <v-layout>
    <TopBodyComponent>
      <template v-slot:left-info>
        <TopBodyBlockComponent />
      </template>
      <template v-slot:center-info>
        <ValidatorsChart />
      </template>
      <template v-slot:right-info>
        <ValidatorsSearch />
      </template>
    </TopBodyComponent>
  </v-layout>
</template>

<script>
import TopBodyBlockComponent from '@/components/TopBodyBlockComponent';
import TopBodyComponent from '@/components/TopBodyComponent';
import ValidatorsChart from './ValidatorsChart';
import ValidatorsSearch from './ValidatorsSearch';

export default {
  name: 'ValidatorsTopBody',
  components: {
    TopBodyBlockComponent,
    TopBodyComponent,
    ValidatorsChart,
    ValidatorsSearch,
  },
};
</script>
