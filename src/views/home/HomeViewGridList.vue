<template>
  <v-row v-if="isLoadingTxs" data-test="loading">
    <v-col cols="12" class="pa-5">
      <base-loading-linear />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <home-view-grid-list-item
      v-for="(transaction, index) in transactions"
      :key="index"
      :transaction="transaction"
    />
  </v-row>
</template>

<script>
import HomeViewGridListItem from './HomeViewGridListItem';

import { mapGetters } from 'vuex';

export default {
  name: 'HomeViewGridList',
  components: { HomeViewGridListItem },
  computed: {
    ...mapGetters('home', ['isLoadingTxs', 'transactions']),
  },
};
</script>
