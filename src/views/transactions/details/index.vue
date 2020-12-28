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
  <v-row v-else-if="error != ''">
    <v-col cols="12">
      <v-alert border="left" prominent text type="error">
        <span class="text-body-1">{{ error }}</span>
      </v-alert>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <TransactionDetailsHeader />
      <TransactionDetailsTopBody />
    </v-col>
  </v-row>
</template>

<script>
import TransactionDetailsHeader from "./TransactionDetailsHeader";
import TransactionDetailsTopBody from "./TransactionDetailsTopBody";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "TransactionDetails",
  components: {
    TransactionDetailsHeader,
    TransactionDetailsTopBody,
  },
  computed: {
    ...mapGetters("transactions", {
      error: "error",
      isLoading: "isLoading",
    }),
    hash() {
      return this.$route.params.id;
    },
  },
  watch: {
    $route(to) {
      this.fetchTransaction(to.params.id);
    },
  },
  methods: {
    ...mapActions("transactions", {
      fetchTransaction: "fetchTransaction",
    }),
  },
  created() {
    if (this.hash) this.fetchTransaction(this.hash);
  },
};
</script>