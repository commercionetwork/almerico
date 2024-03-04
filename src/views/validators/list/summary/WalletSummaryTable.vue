<template>
  <v-card-text>
    <v-data-table
      :caption="$t('titles.delegations')"
      :headers="headers"
      :items="items"
      :items-per-page="5"
    >
      <template #[`item.moniker`]="{ item }">
        <span class="text-caption" v-text="item.moniker" />
      </template>
      <template #[`item.amount`]="{ item }">
        <span class="text-caption" v-text="item.amount" />
      </template>
      <template #[`item.completion_time`]="{ item }">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
              class="orange--text font-weight-bold"
              v-text="item.countdown"
            />
          </template>
          <span v-text="formatCompletionTime(item.completion_time)" />
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex';
import walletSummaryHelper from '../helpers/walletSummaryHelper';

export default {
  name: 'WalletSummaryTable',
  computed: {
    ...mapGetters('validators', ['list', 'wallet']),
    headers() {
      return walletSummaryHelper.getHeaders();
    },
    items() {
      return walletSummaryHelper.getItems({
        delegations: this.wallet.delegations,
        unbondings: this.wallet.unbondings,
        validators: this.list,
      });
    },
  },
  methods: {
    formatCompletionTime(completionTime) {
      return new Date(completionTime).toLocaleString();
    },
  },
};
</script>
