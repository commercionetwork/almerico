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
      <TheHeaderContent :title="$t('titles.transactionDetail')" />
      <TransactionsViewDetailContent />
    </v-col>
  </v-row>
</template>

<script>
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TransactionsViewDetailContent from './detail/TransactionsViewDetailContent.vue';

import { mapActions, mapGetters } from 'vuex';
import { CONFIG } from '@/constants';

export default {
  name: 'TransactionsViewDetail',
  components: {
    TheErrorMessage,
    TheHeaderContent,
    BaseLoadingLinear,
    TransactionsViewDetailContent,
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
