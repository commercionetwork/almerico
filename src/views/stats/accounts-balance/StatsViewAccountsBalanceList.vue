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
export default {
  name: 'StatsViewAccountsBalanceList',
  props: {
    wallets: {
      type: Array,
      required: true,
      note: 'The items to display',
    },
  },

  data() {
    return {
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
      return this.wallets.map((wallet) => {
        const item = { address: wallet.address };
        wallet.balances.forEach((balance) => {
          const amount = parseInt(balance.amount);
          if (balance.denom === 'ucommercio') {
            item.com = amount;
          }
          if (balance.denom === 'uccc') {
            item.ccc = amount;
          }
        });
        return item;
      });
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
