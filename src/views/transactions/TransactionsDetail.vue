<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <HeaderComponent :title="$t('titles.transactionDetail')" />
      <TransactionsDetailContentComponent />
    </v-col>
  </v-row>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';
import TransactionsDetailContentComponent from './detail/TransactionsDetailContentComponent.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TransactionsDetail',
  components: {
    HeaderComponent,
    LoadingLinearComponent,
    TransactionsDetailContentComponent,
  },
  computed: {
    ...mapGetters('transactions', {
      isLoading: 'isLoading',
    }),
    hash() {
      return this.$route.params.id;
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
