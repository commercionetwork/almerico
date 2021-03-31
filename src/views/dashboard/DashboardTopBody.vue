<template>
    <TopBodyComponent>
      <template v-slot:left-info>
        <TopBodyBlockComponent />
      </template>
      <template v-slot:center-info>
        <DashboardChart />
      </template>
      <template v-slot:right-info>
        <DashboardPrice />
      </template>
    </TopBodyComponent>
</template>

<script>
import DashboardChart from "./DashboardChart";
import DashboardPrice from "./DashboardPrice";
import TopBodyBlockComponent from "@/components/TopBodyBlockComponent";
import TopBodyComponent from "@/components/TopBodyComponent";

export default {
  name: "DashboardTopBody",
  components: {
    DashboardChart,
    DashboardPrice,
    TopBodyBlockComponent,
    TopBodyComponent,
  },
};
</script>