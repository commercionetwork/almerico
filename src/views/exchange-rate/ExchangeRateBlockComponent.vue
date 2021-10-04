<template>
  <TopBodyCardComponent title="ccc exchange rate">
    <template v-slot:content>
      <div class="fill-height d-flex flex-column justify-space-between">
        <div class="text-h2 font-weight-black" v-text="rate" />
        <div
          class="text-caption font-weight-bold info--text"
          v-text="'1 divided the % of Circulating Supply'"
        />
      </div>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

export default {
  name: 'ExchangeRateBlockComponent',
  components: { TopBodyCardComponent },
  props: {
    rate: {
      type: String,
      required: true,
      note: 'The exchange rate',
    },
  },
};
</script>
