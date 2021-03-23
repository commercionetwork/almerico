<template>
  <v-layout>
    <TopBody>
      <template v-slot:left>
        <TopBodyBlock />
      </template>
      <template v-slot:center>
        <DashboardChart />
      </template>
      <template v-slot:right>
        <DashboardStats />
      </template>
    </TopBody>
  </v-layout>
</template>

<script>
import DashboardChart from "./DashboardChart";
import DashboardStats from "./DashboardStats";
import TopBody from "@/components/TopBody";
import TopBodyBlock from "@/components/TopBodyBlock";

export default {
  name: "DashboardTopBody",
  components: {
    DashboardChart,
    DashboardStats,
    TopBody,
    TopBodyBlock,
  },
};
</script>