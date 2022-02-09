<template>
  <v-card outlined>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :hide-default-footer="true"
        :items="items"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        disable-pagination
      >
        <template v-slot:top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('titles.txsBySender')"
          />
        </template>
        <template v-slot:[`item.height`]="{ item }">
          <router-link
            class="text-decoration-none"
            v-text="item.height"
            :to="{
              name: ROUTES.NAME.BLOCKS_DETAIL,
              params: { id: item.height },
            }"
          />
        </template>
        <template v-slot:[`item.result`]="{ item }">
          <span
            class="font-weight-bold"
            :class="item.result ? 'info--text' : 'error--text'"
            v-text="item.result ? $t('labels.success') : $t('labels.failed')"
          />
        </template>
        <template v-slot:[`item.hash`]="{ item }">
          <router-link
            class="d-inline-block text-truncate text-decoration-none font-monotype"
            style="max-width: 8.5rem"
            v-text="item.hash"
            :to="{
              name: ROUTES.NAME.TRANSACTIONS_DETAIL,
              params: { id: item.hash },
            }"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'AccountTransactionsComponent',
  props: {
    items: {
      type: Array,
      default: () => [],
      note: 'The items to display',
    },
  },
  data: () => ({
    ROUTES,
    sortBy: 'height',
    sortDesc: true,
  }),
  computed: {
    headers() {
      return [
        { text: this.$t('labels.height'), value: 'height' },
        { text: this.$t('labels.type'), value: 'type' },
        { text: this.$t('labels.result'), value: 'result' },
        { text: this.$t('labels.fee'), value: 'fee' },
        { text: this.$t('labels.hash'), value: 'hash' },
        { text: this.$t('labels.date'), value: 'date' },
      ];
    },
  },
};
</script>
