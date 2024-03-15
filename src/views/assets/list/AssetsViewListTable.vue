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
        <template #[`item.deposit`]="{ item }">
          <v-btn
            v-if="item.balance"
            text
            @click.stop="openTransfer(item, TRANSFER.TYPE.DEPOSIT)"
          >
            <span class="text-caption" v-text="$t('labels.deposit')" />
            <v-icon right>{{ mdiChevronRight }}</v-icon>
          </v-btn>
        </template>
        <template #[`item.withdraw`]="{ item }">
          <v-btn
            v-if="item.balance"
            text
            @click.stop="openTransfer(item, TRANSFER.TYPE.WITHDRAW)"
          >
            <span class="text-caption" v-text="$t('labels.withdraw')" />
            <v-icon right>{{ mdiChevronRight }}</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mdiChevronRight } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';
import assetsTableHelper from '../helpers/assetsTableHelper';
import { CONTRACT, ROUTES, TRANSFER } from '@/constants';
import { tokensHandler } from '@/utils';

export default {
  name: 'AssetsViewListTable',
  data() {
    return {
      TRANSFER,
      mdiChevronRight,
    };
  },
  computed: {
    ...mapGetters('assets', ['balances', 'list', 'supply']),
    headers() {
      return [
        { text: this.$t('labels.name'), value: 'name', width: '30%' },
        { text: this.$t('labels.symbol'), value: 'symbol', width: '10%' },
        {
          text: this.$t('labels.supply'),
          value: 'total_supply',
          align: 'right',
          width: '20%',
        },
        {
          text: this.$t('labels.balance'),
          value: 'balance',
          align: 'right',
          width: '20%',
        },
        {
          text: this.$t('labels.deposit'),
          value: 'deposit',
        },
        {
          text: this.$t('labels.withdraw'),
          value: 'withdraw',
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
    ...mapActions('assets', ['handleModal']),
    formatAmount(tokens, decimals) {
      if (!tokens) {
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
    openTransfer(item, type) {
      this.handleModal({ token: JSON.stringify(item), type });
    },
  },
};
</script>
