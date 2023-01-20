<template>
  <v-card-text>
    <v-data-table
      :caption="$t('titles.delegations')"
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    ></v-data-table>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WalletSummaryTable',
  data() {
    return {
      sortBy: 'amount',
      sortDesc: true,
    };
  },
  computed: {
    ...mapGetters('validators', ['list', 'wallet']),
    headers() {
      return [
        { text: 'Validator', value: 'moniker' },
        { text: 'Amount', value: 'amount' },
        { text: 'Denom', value: 'denom' },
      ];
    },
    items() {
      return this.wallet.delegations.map((el) => {
        const index = this.list.findIndex(
          (it) => it.operator_address === el.delegation.validator_address
        );
        let moniker = '';
        if (index > -1) {
          moniker = this.list[index]['moniker'];
        }
        const delegation = {
          moniker,
          address: el.delegation.validator_address,
          amount: parseInt(el.balance.amount) / 1000000,
          denom: 'COM',
        };
        return delegation;
      });
    },
  },
};
</script>
