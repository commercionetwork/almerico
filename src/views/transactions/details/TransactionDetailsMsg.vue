<template>
  <v-card elevation="2">
    <v-card-title v-text="type" />
    <v-card-subtitle v-text="'Msg type'" />
    <v-list>
      <v-list-item v-for="(msg, index) in msgs" :key="index">
        <v-list-item-content class="text-body-2 text-break" v-text="msg" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { txHandler } from "@/utils";

export default {
  name: "TransactionDetailsMsg",
  computed: {
    ...mapGetters("transactions", {
      transaction: "details",
    }),
    msgs() {
      return this.transaction ? this.transaction.tx.value.msg : [];
    },
    type() {
      return this.transaction ? txHandler.getType(this.msgs) : "";
    },
  },
};
</script>