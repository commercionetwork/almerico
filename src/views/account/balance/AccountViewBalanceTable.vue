<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="items"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template #top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('titles.otherTokensBalance')"
          />
        </template>
        <template #[`item.balance`]="{ item }">
          <span v-text="formatBalance(item.balance, item.decimals)" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AccountViewBalanceTable',
  data() {
    return {
      sortBy: 'name',
      sortDesc: false,
    };
  },
  computed: {
    ...mapGetters('account', ['allBalances']),
    address() {
      return this.$route.params.id;
    },
    headers() {
      return [
        { text: this.$t('labels.name'), value: 'name', width: '40%' },
        { text: this.$t('labels.symbol'), value: 'symbol', width: '20%' },
        { text: this.$t('labels.balance'), value: 'balance' },
      ];
    },
    items() {
      return this.allBalances;
    },
  },
  methods: {
    formatBalance(balance, decimals = 6) {
      return new Intl.NumberFormat(undefined, {
        style: 'decimal',
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      }).format(balance);
    },
  },
};
</script>
