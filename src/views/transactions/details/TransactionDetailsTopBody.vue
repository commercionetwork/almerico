<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="5">
        <TransactionDetailsSpec />
      </v-col>
      <v-col cols="12" md="7">
        <TransactionDetailsMsg />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import TransactionDetailsSpec from "./TransactionDetailsSpec";
import TransactionDetailsMsg from "./TransactionDetailsMsg";

export default {
  name: "TransactionDetailsTopBody",
  components: {
    TransactionDetailsSpec,
    TransactionDetailsMsg,
  },
};
</script>