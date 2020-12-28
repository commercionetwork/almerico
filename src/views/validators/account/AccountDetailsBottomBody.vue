<template>
  <v-layout>
    <v-flex>
      <v-row v-if="error != ''">
        <v-col cols="12">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1">{{ error }}</span>
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <AccountDetailsTransactions :items="items" />
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
          ></v-progress-linear
        ></v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import AccountDetailsTransactions from "./AccountDetailsTransactions";

import { mapActions, mapGetters } from "vuex";
import { CUSTOMIZATION } from "@/constants";
import { TransactionsTableAdapter } from "@/utils";

export default {
  name: "AccountDetailsBottomBody",
  components: {
    AccountDetailsTransactions,
  },
  props: {
    address: {
      type: String,
      required: true,
      note: "The account address",
    },
  },
  computed: {
    ...mapGetters("transactions", {
      error: "error",
      isLoading: "isLoading",
      transactions: "transactions",
    }),
    items() {
      return TransactionsTableAdapter.setTxs(this.transactions)
        .setCoin(CUSTOMIZATION.COIN)
        .setMultiTypes("Multi types")
        .setFilter(null)
        .get();
    },
  },
  watch: {
    transactions(value) {
      // max value must be the same of 'changePage' action
      if (value.length > 0 && value.length < CUSTOMIZATION.TXS.TABLE_ITEMS) {
        this.changePage({ diff: -1 });
      }
    },
  },
  methods: {
    ...mapActions("transactions", {
      getTransactions: "getTransactions",
      changePage: "changePage",
    }),
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) {
        this.changePage({ diff: -1 });
      }
    },
  },
  created() {
    this.getTransactions({
      query: `message.sender=${this.address}`,
      page: 1,
    });
  },
};
</script>