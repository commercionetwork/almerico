<template>
  <v-row v-if="isLoading">
    <v-col cols="12" class="pa-5">
      <v-progress-linear
        indeterminate
        rounded
        color="primary"
        height="25"
        value="10"
      ></v-progress-linear>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <TransactionDetailsHeader />
      <v-row v-if="error != ''">
        <v-col cols="12">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1" v-text="error" />
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else-if="error == '' && tx == null">
        <v-col cols="12">
          <v-alert border="left" prominent text type="info">
            <span class="text-body-1" v-text="infoMessage" />
          </v-alert>
        </v-col>
      </v-row>
      <TransactionDetailsBody v-else class="py-1" :tx="tx" />
    </v-col>
  </v-row>
</template>

<script>
import TransactionDetailsBody from './TransactionDetailsBody';
import TransactionDetailsHeader from './TransactionDetailsHeader';

import { mapActions, mapGetters } from 'vuex';
import { TransactionDetailsAdapter } from '@/utils';

export default {
  name: 'TransactionDetails',
  components: {
    TransactionDetailsBody,
    TransactionDetailsHeader,
  },
  computed: {
    ...mapGetters('transactions', {
      details: 'details',
      error: 'error',
      isLoading: 'isLoading',
    }),
    hash() {
      return this.$route.params.id;
    },
    infoMessage() {
      return 'No transactions with this hash';
    },
    tx() {
      return TransactionDetailsAdapter.setDetails(this.details).get();
    },
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) this.fetchTransaction(to.params.id);
    },
  },
  methods: {
    ...mapActions('transactions', {
      fetchTransaction: 'fetchTransaction',
    }),
  },
  created() {
    if (this.hash) this.fetchTransaction(this.hash);
  },
};
</script>
