<template>
  <v-layout>
    <TopBodyComponent>
      <template v-slot:left-info>
        <TopBodyBlockComponent />
      </template>
      <template v-slot:center-info>
        <TransactionsChart />
      </template>
      <template v-slot:right-info>
        <TransactionsFilter />
      </template>
    </TopBodyComponent>
  </v-layout>
</template>

<script>
import TopBodyBlockComponent from "@/components/TopBodyBlockComponent";
import TopBodyComponent from "@/components/TopBodyComponent";
import TransactionsChart from "./TransactionsChart";
import TransactionsFilter from "./TransactionsFilter";

export default {
  name: "TransactionsTopBody",
  components: {
    TopBodyBlockComponent,
    TopBodyComponent,
    TransactionsChart,
    TransactionsFilter,
  },
};
</script>