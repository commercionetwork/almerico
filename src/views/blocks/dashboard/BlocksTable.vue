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
    <template v-slot:[`item.hash`]="{ item }">
      <span class="d-inline-block text-truncate text-overline" style="max-width: 120px">{{
        item.hash
      }}</span>
    </template>
  </v-data-table>
</template>

<script>
import { ROUTES } from "@/constants";

export default {
  name: "BlocksTable",
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
        { text: "Hash", value: "hash" },
        { text: "Validator", value: "moniker" },
        { text: "Transactions", value: "txs" },
        { text: "Date", value: "date" },
      ];
    },
    caption() {
      let lastHeight = this.items.length > 0 ? this.items[0].height : "-";
      let firstHeight =
        this.items.length > 0 ? this.items[this.items.length - 1].height : "-";
      return `Blocks from ${firstHeight} to ${lastHeight}`;
    },
  },
};
</script>