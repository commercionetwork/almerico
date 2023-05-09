<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <base-loading-linear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <the-error-message :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <the-header-content :title="$t('titles.sharedocDetail')" />
      <transactions-view-sharedoc-content />
    </v-col>
  </v-row>
</template>

<script>
import TransactionsViewSharedocContent from './sharedoc/TransactionsViewSharedocContent.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TransactionsViewSharedoc',
  components: { TransactionsViewSharedocContent },
  props: {
    hash: {
      type: String,
      note: "The transaction hash from route's parameter",
    },
    uuid: {
      type: String,
      note: "The sharedoc uuid from route's parameter",
    },
  },
  computed: {
    ...mapGetters('transactions', ['error', 'isLoading']),
  },
  watch: {
    hash(value) {
      if (value) this.initTransactionsDetail(value);
    },
  },
  created() {
    this.initTransactionsDetail(this.hash);
  },
  methods: {
    ...mapActions('transactions', ['initTransactionsDetail']),
  },
};
</script>
