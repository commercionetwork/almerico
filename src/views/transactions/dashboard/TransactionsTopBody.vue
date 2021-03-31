<template>
  <v-layout>
    <TopBody>
      <template v-slot:left>
        <TopBodyBlockComponent />
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
import TopBodyBlockComponent from "@/components/TopBodyBlockComponent";
import TransactionsChart from "./TransactionsChart";
import TransactionsFilter from "./TransactionsFilter";

export default {
  name: "TransactionsTopBody",
  components: {
    TopBody,
    TopBodyBlockComponent,
    TransactionsChart,
    TransactionsFilter,
  },
};
</script>