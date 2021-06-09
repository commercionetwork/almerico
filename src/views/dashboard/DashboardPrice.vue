<template>
  <TopBodyCardComponent title="price">
    <template v-slot:content>
      <div v-if="isLoading" data-test="loading">
        <v-progress-circular
          color="primary"
          indeterminate
          size="50"
          widht="10"
        />
      </div>
      <div v-else-if="error" data-test="error">
        <v-alert border="left" prominent text type="error">
          <span class="text-body-1" v-text="errorMessage" />
        </v-alert>
      </div>
      <v-layout
        v-else
        fill-height
        justify-center
        align-center
        data-test="content"
      >
        <div class="pr-3">
          <div class="text-overline font-weight-bold" v-text="coinDenom" />
          <div class="text-h4 font-weight-bold" v-text="coinValue" />
        </div>
        <v-divider vertical />
        <div class="pl-3">
          <div class="text-overline font-weight-bold" v-text="tokenDenom" />
          <div class="text-h4 font-weight-bold" v-text="tokenValue" />
        </div>
      </v-layout>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'DashboardPrice',
  components: { TopBodyCardComponent },
  computed: {
    ...mapGetters('dashboard', {
      conversionRate: 'conversionRate',
      error: 'error',
      isLoading: 'isLoading',
    }),
    ...mapGetters('starting', {
      params: 'params',
    }),
    errorMessage() {
      return this.error && this.error.data
        ? this.error.data.error
        : JSON.stringify(this.error);
    },
    coinDenom() {
      return this.$config.generic.stable_coin.symbol;
    },
    coinValue() {
      return this.$config.generic.stable_coin.value.amount;
    },
    tokenDenom() {
      return this.params.bond_denom.substring(1, 4);
    },
    tokenValue() {
      const rate = parseFloat(this.conversionRate);
      return !isNaN(rate) && rate > 0 ? (1 / rate).toFixed(2) : '-';
    },
  },
};
</script>
