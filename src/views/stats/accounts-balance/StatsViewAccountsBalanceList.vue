<template>
  <v-card flat>
    <v-data-table
      :caption="$t('titles.allWallets')"
      :headers="headers"
      :items="items"
      :items-per-page="50"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template #[`item.address`]="{ item }">
        <router-link
          class="text-decoration-none font-weight-bold"
          v-text="item.address"
          :to="{
            name: ROUTES.NAME.ACCOUNT,
            params: { id: item.address },
          }"
        />
      </template>
      <template #[`item.com`]="{ item }">
        <span v-text="formatBalance(item.com, 6)" />
      </template>
      <template #[`item.ccc`]="{ item }">
        <span v-text="formatBalance(item.ccc, 6)" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'StatsViewAccountsBalanceList',
  props: {
    wallets: {
      type: Object,
      required: true,
      note: 'The items to display',
    },
  },
  data() {
    return {
      ROUTES,
      sortBy: 'com',
      sortDesc: true,
    };
  },
  computed: {
    headers() {
      return [
        { text: 'Address', value: 'address' },
        { text: 'COM', value: 'com' },
        { text: 'CCC', value: 'ccc' },
      ];
    },
    items() {
      const items = [];
      for (const el in this.wallets) {
        const wallet = this.wallets[el];
        const item = { address: wallet.address, com: 0, ccc: 0 };
        wallet.value.forEach((val) => {
          const amount = parseInt(val.amount);
          if (val.denom === 'ucommercio') {
            item.com += amount;
          }
          if (val.denom === 'uccc') {
            item.ccc += amount;
          }
        });
        items.push(item);
      }
      return items;
    },
  },
  methods: {
    formatBalance(amount, decimals = 0) {
      if (!amount || isNaN(amount)) return '';
      const balance = amount / Math.pow(10, decimals);
      return new Intl.NumberFormat(undefined, {
        style: 'decimal',
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      }).format(balance);
    },
  },
};
</script>
