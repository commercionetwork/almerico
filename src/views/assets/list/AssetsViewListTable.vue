<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="items"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        @click:row="(item) => openDetail(item)"
      >
        <template #[`item.total_supply`]="{ item }">
          <div v-text="formatSupply(item.total_supply, item.decimals)" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';
import { tokensHandler } from '@/utils';

export default {
  name: 'AssetsViewListTable',
  data() {
    return {
      sortBy: 'name',
      sortDesc: false,
    };
  },
  computed: {
    ...mapGetters('assets', ['list']),
    headers() {
      return [
        { text: this.$t('labels.name'), value: 'name', width: '35%' },
        { text: this.$t('labels.symbol'), value: 'symbol', width: '15%' },
        {
          text: this.$t('labels.supply'),
          value: 'total_supply',
          align: 'right',
        },
      ];
    },
    items() {
      return this.list;
    },
  },
  methods: {
    formatSupply(supply, decimals) {
      const amount = tokensHandler.convertFromBase(supply, decimals);
      return tokensHandler.format(amount, decimals);
    },
    openDetail(item) {
      this.$router.push({
        name: ROUTES.NAME.ASSETS_DETAIL,
        params: { id: item.id },
      });
    },
  },
};
</script>
