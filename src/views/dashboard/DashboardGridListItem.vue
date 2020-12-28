<template>
  <v-col cols="12" md="6">
    <v-card elevation="2">
      <v-card-title v-text="type" />
      <v-card-subtitle v-text="'Msg type'" />
      <v-card-text>
        <span class="d-block"
          >Time: <span class="font-weight-bold" v-text="time"
        /></span>
        <span class="d-block"
          >Status:
          <span
            class="font-weight-bold"
            :class="transaction.code ? 'error--text' : 'info--text'"
            v-text="status"
        /></span>
        <span class="d-block"
          >Hash:
          <router-link
            class="text-decoration-none text-overline"
            v-text="hash"
            :to="txLink"
        /></span>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { ROUTES } from "@/constants";
import { txHandler } from "@/utils";

export default {
  name: "DashboardGridListItem",
  props: {
    transaction: {
      type: Object,
      default: () => ({}),
      note: "The item to display",
    },
  },
  computed: {
    hash() {
      return this.transaction ? this.transaction.txhash : "";
    },
    status() {
      return this.transaction.code ? "Failed" : "Success";
    },
    time() {
      return this.transaction
        ? new Date(this.transaction.timestamp).toLocaleString()
        : "";
    },
    msgs() {
      return this.transaction ? this.transaction.tx.value.msg : [];
    },
    type() {
      return this.transaction ? txHandler.getType(this.msgs) : "";
    },
    txLink() {
      return this.hash
        ? {
            name: ROUTES.NAMES.TRANSACTIONS_DETAILS,
            params: { id: this.hash },
          }
        : {};
    },
  },
};
</script>