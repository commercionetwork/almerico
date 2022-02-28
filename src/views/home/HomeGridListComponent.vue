<template>
  <v-row v-if="isLoadingTxs" data-test="loading">
    <v-col cols="12" class="pa-5">
      <BaseLoadingLinear />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <HomeGridListItemComponent
      v-for="(transaction, index) in transactions"
      :key="index"
      :transaction="transaction"
    />
  </v-row>
</template>

<script>
import HomeGridListItemComponent from './HomeGridListItemComponent';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import { mapGetters } from 'vuex';

export default {
  name: 'HomeGridListComponent',
  components: {
    HomeGridListItemComponent,
    BaseLoadingLinear,
  },
  computed: {
    ...mapGetters('home', {
      isLoadingTxs: 'isLoadingTxs',
      transactions: 'transactions',
    }),
  },
};
</script>
