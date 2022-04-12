<template>
  <v-row v-if="isLoadingTxs" data-test="loading">
    <v-col cols="12" class="pa-5">
      <BaseLoadingLinear />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <HomeViewGridListItem
      v-for="(transaction, index) in transactions"
      :key="index"
      :transaction="transaction"
    />
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import HomeViewGridListItem from './HomeViewGridListItem';

import { mapGetters } from 'vuex';

export default {
  name: 'HomeViewGridList',
  components: {
    BaseLoadingLinear,
    HomeViewGridListItem,
  },
  computed: {
    ...mapGetters('home', ['isLoadingTxs', 'transactions']),
  },
};
</script>
