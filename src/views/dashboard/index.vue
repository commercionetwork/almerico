<template>
  <div>
    <v-row>
      <v-col cols="12">
        <DashboardHeader />
        <DashboardTopBody class="py-1" />
        <DashboardBanner class="py-1" />
        <DashboardMiddleBody class="py-1" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DashboardBanner from "./DashboardBanner";
import DashboardHeader from "./DashboardHeader";
import DashboardMiddleBody from "./DashboardMiddleBody";
import DashboardTopBody from "./DashboardTopBody";

export default {
  name: "Dashboard",
  components: {
    DashboardBanner,
    DashboardHeader,
    DashboardMiddleBody,
    DashboardTopBody,
  },
};
</script>