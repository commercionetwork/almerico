<template>
  <v-row v-if="isLoading" data-test="loading">
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
  <v-row v-else>
    <v-col cols="12">
      <AccountDetailsHeader />
      <v-row v-if="error !== null">
        <v-col cols="12" v-if="error.status === 404" data-test="not-found">
          <v-alert border="left" prominent text type="info">
            <span class="text-body-1" v-text="infoMessage" />
          </v-alert>
        </v-col>
        <v-col cols="12" v-else data-test="error">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1" v-text="errorMessage" />
          </v-alert>
        </v-col>
      </v-row>
      <div v-else data-test="content">
        <AccountDetailsBody class="py-1" />
        <AccountDetailsFooter class="py-1" :address="address" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import AccountDetailsBody from "./AccountDetailsBody";
import AccountDetailsFooter from "./AccountDetailsFooter";
import AccountDetailsHeader from "./AccountDetailsHeader";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccountDetails",
  components: {
    AccountDetailsBody,
    AccountDetailsFooter,
    AccountDetailsHeader
  },
  computed: {
    ...mapGetters("account", {
      isLoading: "isLoading",
      error: "error"
    }),
    address() {
      return this.$route.params.id;
    },
    errorMessage() {
      return this.error && this.error.data
        ? this.error.data.error
        : JSON.stringify(this.error);
    },
    infoMessage() {
      return "No accounts with this id";
    }
  },
  watch: {
    $route(to) {
      this.getAccount(to.params.id);
    }
  },
  methods: {
    ...mapActions("account", {
      getAccount: "getAccount"
    })
  },
  created() {
    if (this.address) this.getAccount(this.address);
  }
};
</script>
