<template>
  <v-card elevation="2" class="pb-3">
    <v-row>
      <v-col cols="12" md="2">
        <v-layout fill-height column align-center justify-center>
          <v-img
            v-if="picture != ''"
            max-height="75"
            max-width="75"
            :src="picture"
          />
          <v-icon
            v-else
            size="50"
            :color="details.status === 2 ? 'info' : 'warning'"
          >
            mdi-hubspot
          </v-icon>
          <span
            class="text-caption"
            :class="details.status === 2 ? 'info--text' : 'warning--text'"
            v-text="status"
          />
        </v-layout>
      </v-col>
      <v-col cols="12" md="10">
        <v-card-title class="text-capitalize" v-text="moniker" />
        <v-card-text>
          <div>Operator:</div>
          <div class="font-weight-bold text-break" v-text="operator" />
          <div>Address:</div>
          <router-link
            class="font-weight-bold text-decoration-none text-break"
            v-text="account"
            :to="toAccount"
          />
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { ROUTES } from "@/constants";

export default {
  name: "ValidatorDetailsAddress",
  props: {
    account: {
      type: String,
      required: true,
      note: "The account address",
    },
    operator: {
      type: String,
      required: true,
      note: "The operator address",
    },
  },
  computed: {
    ...mapGetters("validators", {
      details: "details",
    }),
    toAccount() {
      return {
        name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
        params: { id: this.account },
      };
    },
    moniker() {
      return this.details.description.moniker || "-";
    },
    picture() {
      return this.details.picture ? this.details.picture : "";
    },
    status() {
      return this.details.status === 2 ? "Active" : "Inactive";
    },
  },
};
</script>