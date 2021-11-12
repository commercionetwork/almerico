<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <HeaderComponent :title="$t('titles.exchangeRate')" />
      <v-card>
        <v-card-title>WORK IN PROGRESS</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExchangeRate',
  components: {
    HeaderComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
    ...mapGetters('exchangeRate', {
      abrTokens: 'abrTokens',
      accounts: 'accounts',
      freezedTokens: 'freezedTokens',
      isLoading: 'isLoading',
      pool: 'pool',
      supply: 'supply',
      vbrTokens: 'vbrTokens',
    }),
  },
  methods: {
    ...mapActions('exchangeRate', {
      initExchangeRate: 'initExchangeRate',
    }),
  },
  created() {
    this.initExchangeRate();
  },
};
</script>
