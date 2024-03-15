<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="items"
        @click:row="(item) => openDetail(item)"
      >
        <template #[`item.total_supply`]="{ item }">
          <div v-text="formatAmount(item.total_supply, item.decimals)" />
        </template>
        <template #[`item.balance`]="{ item }">
          <div v-text="formatAmount(item.balance, item.decimals)" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import assetsTableHelper from '../helpers/assetsTableHelper';
import { CONTRACT, ROUTES } from '@/constants';
import { tokensHandler } from '@/utils';

export default {
  name: 'AssetsViewListTable',
  computed: {
    ...mapGetters('assets', ['balances', 'list', 'supply']),
    headers() {
      return [
        { text: this.$t('labels.name'), value: 'name', width: '35%' },
        { text: this.$t('labels.symbol'), value: 'symbol', width: '15%' },
        {
          text: this.$t('labels.supply'),
          value: 'total_supply',
          align: 'right',
        },
        {
          text: this.$t('labels.balance'),
          value: 'balance',
          align: 'right',
        },
      ];
    },
    items() {
      return assetsTableHelper.buildItems({
        balances: this.balances,
        list: this.list,
        supply: this.supply,
      });
    },
  },
  methods: {
    formatAmount(tokens, decimals) {
      if (isNaN(parseFloat(tokens))) {
        return '-';
      }
      const amount = tokensHandler.convertFromBase(tokens, decimals);
      return tokensHandler.format(amount, decimals);
    },
    openDetail(item) {
      if (item.type === CONTRACT.TOKEN.TYPE.NATIVE) {
        return;
      }
      this.$router.push({
        name: ROUTES.NAME.ASSETS_DETAIL,
        params: { id: item.id },
      });
    },
  },
};
</script>
