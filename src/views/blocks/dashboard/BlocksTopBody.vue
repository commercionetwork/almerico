<template>
  <v-layout>
    <TopBodyComponent>
      <template v-slot:left-info>
        <TopBodyBlockComponent />
      </template>
      <template v-slot:center-info>
        <BlocksChart />
      </template>
      <template v-slot:right-info>
        <BlocksSearch />
      </template>
    </TopBodyComponent>
  </v-layout>
</template>

<script>
import BlocksChart from "./BlocksChart";
import BlocksSearch from "./BlocksSearch";
import TopBodyBlockComponent from "@/components/TopBodyBlockComponent";
import TopBodyComponent from "@/components/TopBodyComponent";

export default {
  name: "BlocksTopBody",
  components: {
    BlocksChart,
    BlocksSearch,
    TopBodyBlockComponent,
    TopBodyComponent,
  },
};
</script>
