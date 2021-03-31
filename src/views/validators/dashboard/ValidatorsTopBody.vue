<template>
  <v-layout>
    <TopBody>
      <template v-slot:left>
        <TopBodyBlockComponent />
      </template>
      <template v-slot:center>
        <ValidatorsChart />
      </template>
      <template v-slot:right>
        <ValidatorsSearch />
      </template>
    </TopBody>
  </v-layout>
</template>

<script>
import TopBody from "@/components/TopBody";
import TopBodyBlockComponent from "@/components/TopBodyBlockComponent";
import ValidatorsChart from "./ValidatorsChart";
import ValidatorsSearch from "./ValidatorsSearch";

export default {
  name: "ValidatorsTopBody",
  components: {
    TopBody,
    TopBodyBlockComponent,
    ValidatorsChart,
    ValidatorsSearch,
  },
};
</script>