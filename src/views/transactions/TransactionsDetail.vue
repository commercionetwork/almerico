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
      <TransactionsDetailContentComponent />
    </v-col>
  </v-row>
</template>

<script>
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';
import TransactionsDetailContentComponent from './detail/TransactionsDetailContentComponent.vue';

import { mapActions, mapGetters } from 'vuex';
import { CONFIG } from '@/constants';

export default {
  name: 'TransactionsDetail',
  components: {
    ErrorMessageComponent,
    HeaderComponent,
    LoadingLinearComponent,
    TransactionsDetailContentComponent,
  },
  computed: {
    ...mapGetters('transactions', {
      error: 'error',
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
  updated() {
    this.$nextTick(() => {
      if (this.$route.hash) {
        setTimeout(() => {
          const el = document.querySelector(this.$route.hash);
          if (el) {
            const position = el.getBoundingClientRect().top;
            const offset =
              position + window.pageYOffset - CONFIG.SCROLL.OFFSET_Y;
            window.scrollTo({
              top: offset,
              behavior: CONFIG.SCROLL.BEHAVIOR,
            });
          }
        }, 500);
      }
    });
  },
};
</script>
