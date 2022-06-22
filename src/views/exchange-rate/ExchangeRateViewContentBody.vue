<template>
  <v-row>
    <v-col cols="12">
      <ExchangeRateViewTable
        :headers="headers.maxSupply"
        :items="maxSupplyRows"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateViewTable
        :headers="headers.nonCirculatingSupply"
        :items="nonCirculatingSupplyRows"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateViewTable
        :headers="headers.circulatingSupply"
        :items="circulatingSupplyRows"
        :getRowStyle="getRowStyle"
      />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateViewTable from './ExchangeRateViewTable.vue';

import overviewHelper from './helpers/overviewHelper';
import { EXCHANGE_RATE } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateViewContentBody',
  components: { ExchangeRateViewTable },
  computed: {
    ...mapGetters('exchangeRate', ['overview']),
    headers() {
      return overviewHelper.getHeaders(this.$t, this);
    },
    maxSupplyRows() {
      const rows = this.overview.data.filter(
        (row) => row.group === 'max-supply'
      );
      return overviewHelper.buildRows(this.$t, this, rows);
    },
    nonCirculatingSupplyRows() {
      const rows = this.overview.data.filter(
        (row) => row.group === 'non-circulating-supply'
      );
      return overviewHelper.buildRows(this.$t, this, rows);
    },
    circulatingSupplyRows() {
      const rows = this.overview.data.filter(
        (row) => row.group === 'circulating-supply'
      );
      return overviewHelper.buildRows(this.$t, this, rows);
    },
  },
  methods: {
    getRowStyle(item) {
      switch (item.style) {
        case EXCHANGE_RATE.ROW_STYLE.COMING_SOON:
          return EXCHANGE_RATE.ROW_STYLE.COMING_SOON;
        case EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED:
          return EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED;
        default:
          return EXCHANGE_RATE.ROW_STYLE.REGULAR;
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
::v-deep .coming-soon {
  color: #ff6600;
}

::v-deep .highlighted {
  font-weight: bold;
  background-color: rgba(56, 186, 140, 0.15);
}
</style>
