<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    :sort-by.sync="sortBy"
    :caption="caption"
    :hide-default-footer="true"
    disable-pagination
    class="elevation-2"
  >
    <template v-slot:[`item.active`]="{ item }">
      <span
        class="font-weight-bold"
        :class="item.active ? 'info--text' : 'error--text'"
        v-text="item.active ? 'Yes' : 'Not'"
      />
    </template>
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
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { CUSTOMIZATION, ROUTES } from "@/constants";
import { ValidatorsTableAdapter } from "@/utils";

export default {
  name: "ValidatorsTable",
  data: () => ({
    ROUTES,
    search: "",
    active: true,
    sortBy: "rank",
  }),
  computed: {
    ...mapGetters("blocks", {
      blocks: "blocks",
    }),
    ...mapGetters("starting", {
      pool: "pool",
    }),
    ...mapGetters("validators", {
      filter: "filter",
      latestValidatorsSets: "latestValidatorsSets",
      validators: "validators",
    }),
    items() {
      return ValidatorsTableAdapter.setValidators(this.validators)
        .setBlocks(this.blocks)
        .setCoin(CUSTOMIZATION.COIN)
        .setPool(this.pool)
        .setValidatorsSet(this.latestValidatorsSets)
        .get();
    },
    headers() {
      return [
        { text: "Rank", value: "rank" },
        {
          text: "Active",
          value: "active",
          filter: (value) => value === this.active,
        },
        { text: "Validator", value: "moniker" },
        { text: "Tokens", value: "tokens" },
        { text: "Commission", value: "commission" },
        { text: "Voting Power", value: "votingPower" },
        { text: "Cumulative", value: "cumulative" },
        { text: "Blocks %", value: "attendance" },
      ];
    },
    caption() {
      return this.active
        ? "Active validators list"
        : "Inactive validators list";
    },
  },
  watch: {
    filter(value) {
      this.search = value.moniker;
      this.active = value.active;
    },
  },
};
</script>