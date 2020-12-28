<template>
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
      <BlockDetailsHeader />
      <BlockDetailsTopBody :height="height" />
    </v-col>
  </v-row>
</template>

<script>
import BlockDetailsHeader from "./BlockDetailsHeader";
import BlockDetailsTopBody from "./BlockDetailsTopBody";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "BlockDetails",
  components: {
    BlockDetailsHeader,
    BlockDetailsTopBody,
  },
  computed: {
    ...mapGetters("blocks", {
      error: "error",
      isLoading: "isLoading",
    }),
    height() {
      return this.$route.params.id;
    },
  },
  watch: {
    $route(to) {
      this.getBlock(to.params.id);
    },
  },
  methods: {
    ...mapActions("blocks", {
      getBlock: "getBlock",
    }),
  },
  created() {
    if (this.height) this.getBlock(this.height);
  },
};
</script>