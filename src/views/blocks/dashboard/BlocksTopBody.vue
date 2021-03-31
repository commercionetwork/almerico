<template>
  <v-layout>
    <TopBody>
      <template v-slot:left>
        <TopBodyBlockComponent />
      </template>
      <template v-slot:center>
        <BlocksChart />
      </template>
      <template v-slot:right>
        <BlocksSearch />
      </template>
    </TopBody>
  </v-layout>
</template>

<script>
import BlocksChart from "./BlocksChart";
import BlocksSearch from "./BlocksSearch";
import TopBody from "@/components/TopBody";
import TopBodyBlockComponent from "@/components/TopBodyBlockComponent";

export default {
  name: "BlocksTopBody",
  components: {
    BlocksChart,
    BlocksSearch,
    TopBody,
    TopBodyBlockComponent,
  },
};
</script>
