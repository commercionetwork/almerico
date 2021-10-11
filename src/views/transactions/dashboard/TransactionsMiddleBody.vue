<template>
  <v-layout>
    <v-flex>
      <v-row v-if="error !== null" data-test="error">
        <v-col cols="12">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1" v-text="JSON.stringify(error)" />
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else data-test="content">
        <v-col cols="12">
          <v-card outlined>
            <TransactionsTable :items="items" :msgType="msgType" />
          </v-card>
        </v-col>
        <v-col
          cols="12"
          class="pa-5"
          v-intersect="{
            handler: onIntersect,
            options: {
              threshold: [0.5],
            },
          }"
        >
          <v-progress-linear
            v-if="isLoading"
            indeterminate
            rounded
            color="primary"
            height="25"
            value="10"
            data-test="loading"
          ></v-progress-linear
        ></v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import TransactionsTable from './TransactionsTable';

import { mapActions, mapGetters } from 'vuex';
import { transactionsTableAdapter } from '@/utils';

export default {
  name: 'TransactionsMiddleBody',
  components: {
    TransactionsTable,
  },
  data: () => ({
    msgType: '',
  }),
  computed: {
    ...mapGetters('transactions', {
      isLoading: 'isLoading',
      error: 'error',
      filter: 'filter',
      transactions: 'transactions',
    }),
    items() {
      return transactionsTableAdapter.build(this.transactions, this.filter);
    },
  },
  watch: {
    filter(value) {
      this.msgType = value;
    },
  },
  methods: {
    ...mapActions('transactions', {
      changePage: 'changePage',
    }),
    onIntersect(_entries, _observer, isIntersecting) {
      if (isIntersecting) {
        this.changePage({ diff: 1 });
      }
    },
  },
};
</script>
