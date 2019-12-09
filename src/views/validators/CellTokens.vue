<template>
  <HeaderCell :chart='false'>
    <div slot="header">
      <span>
        <Icon
          name="coins"
          scale="1"
        />
      </span>
      <span
        class="pl-1"
        v-text="$t('labels.bonded')"
      />
    </div>
    <div slot="body">
      <span
        v-if="isFetching"
        class="text-info"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <span
        v-else
        v-text="proportion"
        data-test="items"
      />
    </div>
  </HeaderCell>
</template>

<script>
import HeaderCell from "Components/common/HeaderCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/coins";

import { API_VERSION, SUPPORTED_API_VERSION } from "Constants";
import { mapGetters } from "vuex";

export default {
  name: "CellTokens",
  description: "Display the bonded tokens",
  components: {
    HeaderCell,
    Icon
  },
  computed: {
    ...mapGetters("stake", {
      pool: "pool",
      isFetchingPool: "isFetching"
    }),
    ...mapGetters("tendermint", {
      genesis: "genesis",
      isFetchingGenesis: "isFetching"
    }),
    bonded() {
      return this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
    },
    isFetching() {
      return this.isFetchingPool || this.isFetchingGenesis;
    },
    proportion() {
      let bonded = (this.bonded / 1000000000).toFixed(0);
      let total = (this.totalToken / 1000000000).toFixed(0);
      return total > 0 ? `${bonded}M/${total}M` : "-";
    },
    totalToken() {
      let tot = 0;
      let accounts = [];
      switch (API_VERSION) {
        case SUPPORTED_API_VERSION.V036:
          if (this.genesis) accounts = this.genesis.genesis.app_state.accounts;
          if (accounts.length > 0) {
            accounts.forEach(account => {
              if (account.coins && account.coins.length > 0)
                tot += parseFloat(account.coins[0].amount);
            });
          }
          break;
        case SUPPORTED_API_VERSION.V038:
          if (this.genesis)
            accounts = this.genesis.genesis.app_state.auth.accounts;
          if (accounts.length > 0) {
            accounts.forEach(account => {
              if (account.value.coins && account.value.coins.length > 0)
                tot += parseFloat(account.value.coins[0].amount);
            });
          }
          break;
        default:
          if (this.genesis) accounts = this.genesis.genesis.app_state.accounts;
          if (accounts.length > 0) {
            accounts.forEach(account => {
              if (account.coins && account.coins.length > 0)
                tot += parseFloat(account.coins[0].amount);
            });
          }
          break;
      }

      return tot;
    }
  }
};
</script>
