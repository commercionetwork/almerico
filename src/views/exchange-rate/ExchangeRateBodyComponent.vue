<template>
  <v-row>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="model.maxSupply.headers"
        :items="model.maxSupply.rows"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="model.nonCirculatingSupply.headers"
        :items="model.nonCirculatingSupply.rows"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="model.circulatingSupply.headers"
        :items="model.circulatingSupply.rows"
        :getRowStyle="getRowStyle"
      />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateTableComponent from './ExchangeRateTableComponent.vue';

import { EXCHANGE_RATE } from '@/constants';

export default {
  name: 'ExchangeRateBodyComponent',
  components: { ExchangeRateTableComponent },
  props: {
    model: {
      type: Object,
      required: true,
      note: 'The spreadsheet data',
      validator: (model) => {
        const keys = Object.keys(model);
        const values = [
          'maxSupply',
          'nonCirculatingSupply',
          'circulatingSupply',
          'exchangeRate',
        ];
        return keys.every((key) => values.includes(key));
      },
    },
  },
  methods: {
    getRowStyle(item) {
      switch (item.style) {
        case EXCHANGE_RATE.ROW_STYLE.COMING_SOON:
          return 'coming-soon-row';
        case EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED:
          return 'highlighted-row';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped>
::v-deep .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  padding-bottom: 10px;
  font-size: 18px !important;
}
::v-deep .coming-soon-row {
  color: #ff6600;
}

::v-deep .highlighted-row {
  font-weight: bold;
  background-color: rgba(56, 186, 140, 0.15);
}
</style>
