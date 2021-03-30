<template>
    <DashboardInfo>
      <template v-slot:left-info>
        <TopBodyBlock />
      </template>
      <template v-slot:center-info>
        <DashboardChart />
      </template>
      <template v-slot:right-info>
        <DashboardStats />
      </template>
    </DashboardInfo>
</template>

<script>
import DashboardChart from "./DashboardChart";
import DashboardStats from "./DashboardStats";
import DashboardInfo from "@/components/DashboardInfo";
import TopBody from "@/components/TopBody";
import TopBodyBlock from "@/components/TopBodyBlock";

export default {
  name: "DashboardTopBody",
  components: {
    DashboardInfo,
    DashboardChart,
    DashboardStats,
    TopBody,
    TopBodyBlock,
  },
};
</script>