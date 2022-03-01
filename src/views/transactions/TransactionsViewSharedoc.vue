<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <BaseLoadingLinear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <TheErrorMessage :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <TheHeaderContent :title="$t('titles.sharedocDetail')" />
      <TransactionsViewSharedocContent />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import TransactionsViewSharedocContent from './sharedoc/TransactionsViewSharedocContent.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TransactionsViewSharedoc',
  components: {
    BaseLoadingLinear,
    TheErrorMessage,
    TheHeaderContent,
    TransactionsViewSharedocContent,
  },
  computed: {
    ...mapGetters('transactions', {
      error: 'error',
      isLoading: 'isLoading',
    }),
    hash() {
      return this.$route.params.hash;
    },
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
    ...mapActions('transactions', {
      initTransactionsDetail: 'initTransactionsDetail',
    }),
  },
};
</script>
