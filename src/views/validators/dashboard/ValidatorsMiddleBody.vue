<template>
  <v-layout>
    <v-flex>
      <v-row v-if="isLoading">
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
      <v-row v-else-if="error != ''">
        <v-col cols="12">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1">{{ error }}</span>
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <ValidatorsTable />
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import ValidatorsTable from "./ValidatorsTable";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "ValidatorsMiddleBody",
  components: {
    ValidatorsTable,
  },
  computed: {
    ...mapGetters("blocks", {
      isLoading: "isLoading",
      error: "error",
      latest: "latest",
    }),
  },
  methods: {
    ...mapActions("blocks", {
      fetchBlocks: "fetchBlocks",
    }),
  },
  created() {
    if (this.latest != null) {
      const height = this.latest.header.height;
      this.fetchBlocks({ max: height, min: height - 100 });
    }
  },
};
</script>