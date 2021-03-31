<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    :custom-filter="filterValidators"
    :sort-by.sync="sortBy"
    :hide-default-footer="true"
    disable-pagination
  >
    <template v-slot:top>
      <div class="py-2 text-center text-overline font-weight-bold" v-text="caption" />
    </template>
    <template v-slot:[`item.rank`]="{ item }">
      <div
        class="py-1 px-3 rounded-circle d-inline-block"
        :class="item.active ? 'primary' : 'warning'"
      >
        <span class="font-weight-bold white--text" v-text="item.rank" />
      </div>
    </template>
    <template v-slot:[`item.moniker`]="{ item }">
      <router-link
        class="text-decoration-none font-weight-bold"
        v-text="item.moniker"
        :to="{
          name: ROUTES.NAMES.VALIDATORS_DETAILS,
          params: { id: item.operator }
        }"
      />
    </template>
    <template v-slot:[`item.active`]="{ item }">
      <span
        class="font-weight-bold"
        :class="item.active ? 'info--text' : 'error--text'"
        v-text="item.active ? 'Yes' : 'Not'"
      />
    </template>
    <template v-slot:[`item.tokens`]="{ item }">
      <span class="text-uppercase" v-text="item.tokens" />
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { CUSTOMIZATION, ROUTES } from "@/constants";
import { blocksHandler, ValidatorsTableAdapter } from "@/utils";

export default {
  name: "ValidatorsTable",
  data: () => ({
    ROUTES,
    search: "",
    active: true,
    sortBy: "rank"
  }),
  computed: {
    ...mapGetters("blocks", {
      blocks: "blocks"
    }),
    ...mapGetters("starting", {
      params: "params",
      pool: "pool"
    }),
    ...mapGetters("validators", {
      filter: "filter",
      latestValidatorsSets: "latestValidatorsSets",
      validators: "validators"
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : "";
    },
    items() {
      const restrictedBlocks = CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR
        .VISIBILITY
        ? blocksHandler.restrictBlocks({
            blocks: this.blocks,
            prop: ["header", "height"],
            limit: CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT
          })
        : [];
      return ValidatorsTableAdapter.setValidators(this.validators)
        .setBlocks(restrictedBlocks)
        .setCoin(this.bondDenom)
        .setPool(this.pool)
        .setValidatorsSet(this.latestValidatorsSets)
        .setAccountPrefix(this.$config.generic.prefixes.account.address)
        .get();
    },
    headers() {
      let headers = [
        { text: "Rank", value: "rank" },
        { text: "Validator", value: "moniker" },
        {
          text: "Active",
          value: "active",
          filter: value => value === this.active
        },
        { text: "Tokens", value: "tokens" },
        { text: "Commission", value: "commission" },
        { text: "Voting Power", value: "votingPower" },
        { text: "Cumulative", value: "cumulative" }
      ];
      if (CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.VISIBILITY) {
        headers.push({ text: "Blocks %", value: "attendance" });
      }
      return headers;
    },
    caption() {
      return this.active
        ? "Active validators list"
        : "Inactive validators list";
    }
  },
  watch: {
    filter(value) {
      this.search = value.moniker;
      this.active = value.active;
    }
  },
  methods: {
    filterValidators(_value, search, item) {
      if (typeof search.trim() !== "string") {
        return;
      }
      const props = [item.moniker, item.operator, item.account];
      let found = false;
      for (const prop of props) {
        if (prop.toLowerCase().includes(search.toLowerCase())) {
          found = true;
          break;
        }
      }
      return found;
    }
  }
};
</script>
