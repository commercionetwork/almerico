<template>
  <v-card-text>
    <v-data-table
      :headers="headers"
      :hide-default-footer="true"
      :items="items"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      disable-pagination
    >
      <template #[`item.height`]="{ item }">
        <router-link
          class="text-decoration-none"
          :to="{
            name: ROUTES.NAME.BLOCKS_DETAIL,
            params: { id: item.height },
          }"
        >
          <span v-text="item.height" />
        </router-link>
      </template>
      <template #[`item.result`]="{ item }">
        <span
          class="font-weight-bold"
          :class="item.result ? 'info--text' : 'error--text'"
          v-text="item.result ? $t('labels.success') : $t('labels.failed')"
        />
      </template>
      <template #[`item.fee`]="{ item }">
        <span class="text-uppercase" v-text="item.fee" />
      </template>
      <template #[`item.hash`]="{ item }">
        <router-link
          class="d-inline-block text-truncate text-decoration-none font-monotype"
          style="max-width: 10rem"
          :to="{
            name: ROUTES.NAME.TRANSACTIONS_DETAIL,
            params: { id: item.hash },
          }"
        >
          <span v-text="item.hash" />
        </router-link>
      </template>
      <template #[`item.timestamp`]="{ item }">
        <v-tooltip top>
          <template #activator="{ on }">
            <div v-on="on">
              <span v-text="formatTime(item.timestamp)" />
            </div>
          </template>
          <span v-text="formatDate(item.timestamp)" />
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script>
import { ROUTES } from '@/constants';
import { dateHandler } from '@/utils';

export default {
  name: 'AccountViewDashboardTransactions',
  props: {
    items: {
      type: Array,
      default: () => [],
      note: 'The items to display',
    },
  },
  data() {
    return {
      ROUTES,
      sortBy: 'height',
      sortDesc: true,
    };
  },
  computed: {
    headers() {
      return [
        { text: this.$t('labels.height'), value: 'height' },
        { text: this.$t('labels.type'), value: 'type', width: '25%' },
        { text: this.$t('labels.result'), value: 'result', width: '10%' },
        { text: this.$t('labels.fee'), value: 'fee', width: '15%' },
        { text: this.$t('labels.hash'), value: 'hash', width: '25%' },
        { text: this.$t('labels.date'), value: 'timestamp', width: '15%' },
      ];
    },
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
    formatTime(timestamp) {
      return dateHandler.getFormattedDifference(
        new Date(timestamp),
        new Date()
      );
    },
  },
};
</script>
