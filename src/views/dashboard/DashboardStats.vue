<template>
  <DashboardCard title="com">
    <template v-slot:content>
      <span
        class="text-h3 primary--text font-weight-bold"
        v-text="tokenValue"
      />
    </template>
  </DashboardCard>
</template>

<script>
import DashboardCard from "@/components/DashboardCard.vue";

import { mapGetters } from "vuex";

export default {
  name: "DashboardStats",
  components: { DashboardCard },
  computed: {
    ...mapGetters("starting", {
      conversionRate: "conversionRate"
    }),
    tokenValue() {
      const rate = parseFloat(this.conversionRate);
      return !isNaN(rate) && rate > 0 ? `€ ${(1 / rate).toFixed(2)}` : "-";
    }
  }
};
</script>
