<template>
  <v-layout>
    <TopBody>
      <template v-slot:left>
        <TopBodyBlock />
      </template>
      <template v-slot:center>
        <TransactionsChart />
      </template>
      <template v-slot:right>
        <TransactionsFilter />
      </template>
    </TopBody>
  </v-layout>
</template>

<script>
import TopBody from "@/components/TopBody";
import TopBodyBlock from "@/components/TopBodyBlock";
import TransactionsChart from "./TransactionsChart";
import TransactionsFilter from "./TransactionsFilter";

export default {
  name: "TransactionsTopBody",
  components: {
    TopBody,
    TopBodyBlock,
    TransactionsChart,
    TransactionsFilter,
  },
};
</script>