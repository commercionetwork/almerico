<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="items"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :caption="caption"
    :items-per-page="5"
    class="elevation-2"
  >
    <template v-slot:[`item.result`]="{ item }">
      <span
        class="font-weight-bold"
        :class="item.result ? 'info--text' : 'error--text'"
        v-text="item.result ? 'Success' : 'Failed'"
      />
    </template>
    <template v-slot:[`item.hash`]="{ item }">
      <router-link
        class="d-inline-block text-truncate text-decoration-none text-overline"
        style="max-width: 200px"
        v-text="item.hash"
        :to="{
          name: ROUTES.NAMES.TRANSACTIONS_DETAILS,
          params: { id: item.hash },
        }"
      />
    </template>
  </v-data-table>
</template>

<script>
import { ROUTES } from "@/constants";

export default {
  name: "BlockDetailsTable",
  props: {
    height: {
      type: String,
      required: true,
      note: "The block height",
    },
    items: {
      type: Array,
      default: () => [],
      note: "The items to display",
    },
    loading: {
      type: Boolean,
      default: false,
      note: "The transactions loading state",
    },
  },
  data: () => ({
    ROUTES,
    sortBy: "result",
    sortDesc: true,
  }),
  computed: {
    headers() {
      return [
        { text: "Result", value: "result" },
        { text: "Type", value: "type" },
        { text: "Hash", value: "hash" },
      ];
    },
    caption() {
      return `Transactions at the height ${this.height}`;
    },
  },
};
</script>