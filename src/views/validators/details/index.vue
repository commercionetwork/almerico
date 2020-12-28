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
      <ValidatorDetailsHeader />
      <ValidatorDetailsTopBody
        class="py-1"
        :account="account"
        :operator="operator"
        :delegations="delegations"
      />
      <ValidatorDetailsMiddleBody
         class="py-1"
        :account="account"
        :delegations="delegations"
      />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorDetailsHeader from "./ValidatorDetailsHeader";
import ValidatorDetailsMiddleBody from "./ValidatorDetailsMiddleBody";
import ValidatorDetailsTopBody from "./ValidatorDetailsTopBody";

import { mapActions, mapGetters } from "vuex";
import { CUSTOMIZATION } from "@/constants";
import { bech32Manager, ValidatorDelegationsHandler } from "@/utils";

export default {
  name: "ValidatorDetails",
  components: {
    ValidatorDetailsHeader,
    ValidatorDetailsMiddleBody,
    ValidatorDetailsTopBody,
  },
  computed: {
    ...mapGetters("validators", {
      error: "error",
      isLoading: "isLoading",
      details: "details",
    }),
    address() {
      return this.$route.params.id;
    },
    account() {
      const hexValue = bech32Manager.decode(this.operator);
      return bech32Manager.encode(
        hexValue,
        CUSTOMIZATION.PREFIXES.ACCOUNT.ADDRESS
      );
    },
    delegations() {
      return this.details
        ? ValidatorDelegationsHandler.setAddress(this.account)
            .setDelegations(this.details.delegations)
            .get()
        : {};
    },
    operator() {
      return this.details ? this.details.operator_address : "";
    },
  },
  watch: {
    $route(to) {
      this.getValidatorData({ address: to.params.id });
    },
  },
  methods: {
    ...mapActions("validators", {
      getValidatorData: "getValidatorData",
    }),
  },
  created() {
    if (this.address != null) {
      this.getValidatorData({ address: this.address });
    }
  },
};
</script>