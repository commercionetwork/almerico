<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :caption="caption"
    :hide-default-footer="true"
    disable-pagination
    class="elevation-2"
  >
    <template v-slot:[`item.height`]="{ item }">
      <router-link
        class="text-decoration-none"
        v-text="item.height"
        :to="{
          name: ROUTES.NAMES.BLOCKS_DETAILS,
          params: { id: item.height },
        }"
      />
    </template>
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
        style="max-width: 120px"
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
  name: "AccountDetailsTransactions",
  props: {
    items: {
      type: Array,
      default: () => [],
      note: "The items to display",
    },
  },
  data: () => ({
    ROUTES,
    sortBy: "height",
    sortDesc: true,
  }),
  computed: {
    headers() {
      return [
        { text: "Height", value: "height" },
        { text: "Type", value: "type" },
        { text: "Result", value: "result" },
        { text: "Fee", value: "fee" },
        { text: "Hash", value: "hash" },
        { text: "Date", value: "date" },
      ];
    },
    caption() {
      return "Txs by msg sender";
    },
  },
};
</script>