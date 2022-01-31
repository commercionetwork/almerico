<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <LoadingLinearComponent :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <ErrorMessageComponent :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <HeaderComponent :title="$t('titles.transactionDetail')" />
      <TransactionsSharedocContentComponent />
    </v-col>
  </v-row>
</template>

<script>
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';
import TransactionsSharedocContentComponent from './sharedoc/TransactionsSharedocContentComponent.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TransactionsSharedoc',
  components: {
    ErrorMessageComponent,
    HeaderComponent,
    LoadingLinearComponent,
    TransactionsSharedocContentComponent,
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
  methods: {
    ...mapActions('transactions', {
      initTransactionsDetail: 'initTransactionsDetail',
    }),
  },
  created() {
    this.initTransactionsDetail(this.hash);
  },
};
</script>
