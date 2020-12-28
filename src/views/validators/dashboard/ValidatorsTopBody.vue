<template>
  <v-layout>
    <TopBody>
      <template v-slot:left>
        <TopBodyBlock />
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
import TopBodyBlock from "@/components/TopBodyBlock";
import ValidatorsChart from "./ValidatorsChart";
import ValidatorsSearch from "./ValidatorsSearch";

export default {
  name: "ValidatorsTopBody",
  components: {
    TopBody,
    TopBodyBlock,
    ValidatorsChart,
    ValidatorsSearch,
  },
};
</script>