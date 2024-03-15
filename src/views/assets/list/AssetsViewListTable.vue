<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="items"
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
import assetsTableHelper from '../helpers/assetsTableHelper';
import { ROUTES } from '@/constants';
import { tokensHandler } from '@/utils';

export default {
  name: 'AssetsViewListTable',
  computed: {
    ...mapGetters('assets', ['list', 'supply']),
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
      return assetsTableHelper.buildItems({
        supply: this.supply,
        list: this.list,
      });
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
