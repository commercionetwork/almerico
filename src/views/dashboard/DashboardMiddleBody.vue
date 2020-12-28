<template>
  <v-layout>
    <v-flex>
      <v-row>
        <v-col cols="12">
          <h2 class="pt-3 text-h4" v-text="title" />
        </v-col>
      </v-row>
      <DashboardGridList :limit="CUSTOMIZATION.TXS.DASHBOARD_ITEMS" />
    </v-flex>
  </v-layout>
</template>

<script>
import DashboardGridList from "./DashboardGridList";

import { mapActions } from "vuex";
import { CUSTOMIZATION } from "@/constants";

export default {
  name: "DashboardMiddleBody",
  components: {
    DashboardGridList,
  },
  data: () => ({
    CUSTOMIZATION,
  }),
  computed: {
    title() {
      return `Last ${CUSTOMIZATION.TXS.DASHBOARD_ITEMS} transactions`;
    },
  },
  methods: {
    ...mapActions("transactions", {
      getLatestTransactions: "getLatestTransactions",
    }),
  },
  created() {
    this.getLatestTransactions({
      items: CUSTOMIZATION.TXS.DASHBOARD_ITEMS,
    });
  },
};
</script>