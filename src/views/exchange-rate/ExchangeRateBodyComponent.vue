<template>
  <v-row>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="model.maxHeaders"
        :items="model.maxData"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="model.nonCirculatingHeaders"
        :items="model.nonCirculatingData"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="model.circulatingHeaders"
        :items="model.circulatingData"
        :getRowStyle="getRowStyle"
      />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateTableComponent from './ExchangeRateTableComponent.vue';

import { OVERVIEW } from '@/constants';
import { arrayHandler } from '@/utils';

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
        return arrayHandler.isArrayContentValid(keys, [
          'circulatingData',
          'circulatingHeaders',
          'nonCirculatingData',
          'nonCirculatingHeaders',
          'maxData',
          'maxHeaders',
        ]);
      },
    },
  },
  methods: {
    getRowStyle(item) {
      switch (item.type) {
        case OVERVIEW.ROW_STYLE.COMING_SOON:
          return 'coming-soon-row';
        case OVERVIEW.ROW_STYLE.HIGHLIGHTED:
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
