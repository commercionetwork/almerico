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
      <template #[`item.type`]="{ item }">
        <span class="text-caption text-capitalize" v-text="item.type" />
      </template>
      <template #[`item.amount`]="{ item }">
        <span
          class="text-caption"
          :class="
            item.type === VALIDATORS.DELEGATION.TYPE.BONDED
              ? 'font-weight-bold'
              : 'font-italic'
          "
          v-text="item.amount"
        />
      </template>
      <template #[`item.completion_time`]="{ item }">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
              class="orange--text"
              v-text="item.countdown"
            />
          </template>
          <span v-text="formatCompletionTime(item.completion_time)" />
        </v-tooltip>
      </template>
      <template #[`item.address`]="{ item }">
        <validator-manager
          v-if="item.type === VALIDATORS.DELEGATION.TYPE.BONDED"
          :address="item.address"
          :commission="item.commission"
          :moniker="item.moniker"
        />
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script>
import ValidatorManager from '../manager/ValidatorManager.vue';

import { mapGetters } from 'vuex';
import walletSummaryHelper from '../helpers/walletSummaryHelper';
import { VALIDATORS } from '@/constants';

export default {
  name: 'WalletSummaryTable',
  components: {
    ValidatorManager,
  },
  data() {
    return {
      VALIDATORS,
    };
  },
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
