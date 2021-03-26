<template>
  <v-layout>
    <v-flex>
      <v-row v-if="isBlocksMonitor && isLoading" data-test="loading">
        <v-col cols="12" class="pa-5">
          <v-progress-linear
            indeterminate
            rounded
            color="primary"
            height="25"
            value="10"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row v-else-if="isBlocksMonitor && error !== null" data-test="error">
        <v-col cols="12">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1" v-text="errorMessage" />
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else data-test="content">
        <v-col cols="12">
          <v-card outlined>
            <ValidatorsTable />
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import ValidatorsTable from "./ValidatorsTable";

import { mapActions, mapGetters } from "vuex";
import { CUSTOMIZATION } from "@/constants";

export default {
  name: "ValidatorsMiddleBody",
  components: {
    ValidatorsTable
  },
  computed: {
    ...mapGetters("blocks", {
      isLoading: "isLoading",
      error: "error",
      latest: "latest"
    }),
    errorMessage() {
      return this.error && this.error.data
        ? this.error.data.error
        : JSON.stringify(this.error);
    },
    isBlocksMonitor() {
      return CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.VISIBILITY;
    }
  },
  methods: {
    ...mapActions("blocks", {
      getBlocks: "getBlocks"
    })
  },
  created() {
    if (this.isBlocksMonitor && this.latest !== null) {
      let height = this.latest.header.height;
      this.getBlocks({
        maxHeight: height,
        items: CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT
      });
    }
  }
};
</script>
