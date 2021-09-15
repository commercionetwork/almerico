<template>
  <v-card outlined class="pa-3">
    <v-card-text>
      <div class="text-uppercase text-h5 font-weight-black" v-text="rate" />
      <div
        class="text-caption error--text"
        v-text="'(1 divided the % of Circulating Supply)'"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ExchangeRateIndexComponent',
  props: {
    exchangeRate: {
      type: String,
      required: true,
      note: 'The exchange rate',
    },
  },
  computed: {
    rate() {
      return `exchange rate: ${this.exchangeRate}`;
    },
  },
};
</script>
