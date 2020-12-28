<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :caption="caption"
    class="elevation-2"
  >
    <template v-slot:[`item.moniker`]="{ item }">
      <router-link
        class="text-decoration-none"
        v-text="item.moniker"
        :to="{
          name: ROUTES.NAMES.VALIDATORS_DETAILS,
          params: { id: item.operator },
        }"
      />
    </template>
    <template v-slot:[`item.amount`]="{ item }">
      <span class="font-weight-bold" v-text="formatTokens(item.amount)" />
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { ROUTES } from "@/constants";
import { AccountDelegationsHandler } from "@/utils";

export default {
  name: "AccountDetailsDelegations",
  data: () => ({
    ROUTES,
    sortBy: "amount",
    sortDesc: true,
  }),
  computed: {
    ...mapGetters("account", {
      delegations: "delegations",
    }),
    ...mapGetters("validators", {
      validators: "validators",
    }),
    headers() {
      return [
        { text: "Validator", value: "moniker" },
        { text: "Amount", value: "amount" },
      ];
    },
    items() {
      return AccountDelegationsHandler.setDelegations(this.delegations)
        .setValidators(this.validators)
        .get();
    },
    caption() {
      return "Delegations";
    },
  },
  methods: {
    formatTokens(value) {
      const options = {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      };
      return `${new Intl.NumberFormat(undefined, options).format(
        value / 1000000
      )} Commercio`;
    },
  },
};
</script>