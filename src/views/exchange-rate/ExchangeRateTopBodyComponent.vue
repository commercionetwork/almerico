<template>
  <TopBodyComponent>
    <template v-slot:left-info>
      <TopBodyBlockComponent />
    </template>
    <template v-slot:center-info> </template>
    <template v-slot:right-info>
      <ExchangeRateBlockComponent :rate="rate" />
    </template>
  </TopBodyComponent>
</template>

<script>
import ExchangeRateBlockComponent from './ExchangeRateBlockComponent.vue';
import TopBodyBlockComponent from '@/components/TopBodyBlockComponent';
import TopBodyComponent from '@/components/TopBodyComponent';

export default {
  name: 'ExchangeRateTopBodyComponent',
  props: {
    rate: {
      type: String,
      required: true,
      note: 'The exchange rate',
    },
  },
  components: {
    ExchangeRateBlockComponent,
    TopBodyBlockComponent,
    TopBodyComponent,
  },
};
</script>
