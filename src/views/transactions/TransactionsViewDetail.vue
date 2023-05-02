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
      <the-header-content :title="$t('titles.transactionDetail')" />
      <transactions-view-detail-content />
    </v-col>
  </v-row>
</template>

<script>
import TransactionsViewDetailContent from './detail/TransactionsViewDetailContent.vue';

import { mapActions, mapGetters } from 'vuex';
import { CONFIG } from '@/constants';

export default {
  name: 'TransactionsViewDetail',
  components: { TransactionsViewDetailContent },
  props: {
    id: {
      type: String,
      note: "The transaction's id from route's parameter",
    },
  },
  computed: {
    ...mapGetters('transactions', ['error', 'isLoading']),
  },
  watch: {
    id(value) {
      if (value) this.initTransactionsDetail(value);
    },
  },
  created() {
    this.initTransactionsDetail(this.id);
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
  methods: {
    ...mapActions('transactions', ['initTransactionsDetail']),
  },
};
</script>
