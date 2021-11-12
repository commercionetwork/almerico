<template>
  <TopContentCardComponent :title="$t('titles.price')">
    <template v-slot:content>
      <v-row class="fill-height d-flex align-center" data-test="content">
        <v-col cols="6" class="ma-0 pa-0">
          <div
            class="py-5 pl-5"
            style="border-width: 0 1px 0 0; border-style: solid"
          >
            <div
              class="text-overline font-weight-bold"
              v-text="CONFIG.STABLE_COIN.SYMBOL"
            />
            <div
              class="text-h4 font-weight-bold"
              v-text="CONFIG.STABLE_COIN.VALUE.AMOUNT"
            />
          </div>
        </v-col>
        <v-col cols="6" class="ma-0 pa-0">
          <div
            class="py-5 pr-5"
            style="border-width: 0 0 0 1px; border-style: hidden"
          >
            <div class="text-overline font-weight-bold" v-text="tokenDenom" />
            <div class="text-h4 font-weight-bold" v-text="tokenValue" />
          </div>
        </v-col>
      </v-row>
    </template>
  </TopContentCardComponent>
</template>

<script>
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

import { mapGetters } from 'vuex';
import { CONFIG } from '@/constants';

export default {
  name: 'HomePricePosterComponent',
  components: { TopContentCardComponent },
  data: () => ({
    CONFIG,
  }),
  computed: {
    ...mapGetters('home', {
      rate: 'conversionRate',
      isLoading: 'isLoading',
    }),
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
    tokenDenom() {
      return this.params.bond_denom.substring(1, 4);
    },
    tokenValue() {
      return !isNaN(this.rate) && this.rate > 0
        ? (1 / this.rate).toFixed(2)
        : '-';
    },
  },
};
</script>
