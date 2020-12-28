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
      <AccountDetailsHeader />
      <AccountDetailsTopBody class="py-1" />
      <AccountDetailsMiddleBody class="py-1" />
      <AccountDetailsBottomBody class="py-1" :address="address" />
    </v-col>
  </v-row>
</template>

<script>
import AccountDetailsBottomBody from "./AccountDetailsBottomBody";
import AccountDetailsHeader from "./AccountDetailsHeader";
import AccountDetailsMiddleBody from "./AccountDetailsMiddleBody";
import AccountDetailsTopBody from "./AccountDetailsTopBody";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccountDetails",
  components: {
    AccountDetailsBottomBody,
    AccountDetailsHeader,
    AccountDetailsMiddleBody,
    AccountDetailsTopBody,
  },
  computed: {
    ...mapGetters("account", {
      isLoading: "isLoading",
      error: "error",
    }),
    address() {
      return this.$route.params.id;
    },
  },
  watch: {
    $route(to) {
      this.getAccount(to.params.id);
    },
  },
  methods: {
    ...mapActions("account", {
      getAccount: "getAccount",
    }),
  },
  created() {
    if (this.address) this.getAccount(this.address);
  },
};
</script>