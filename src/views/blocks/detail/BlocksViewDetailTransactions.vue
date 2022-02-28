<template>
  <v-card outlined>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items-per-page="5"
        :items="items"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template #top>
          <div class="py-2 text-center text-overline font-weight-bold">
            <i18n tag="span" path="titles.transactionsAtHeight">
              <span v-text="height" />
            </i18n>
          </div>
        </template>
        <template #[`item.result`]="{ item }">
          <span
            class="font-weight-bold"
            :class="item.result ? 'info--text' : 'error--text'"
            v-text="item.result ? $t('labels.success') : $t('labels.failed')"
          />
        </template>
        <template #[`item.hash`]="{ item }">
          <div class="word-overflow">
            <router-link
              class="text-decoration-none text-monotype"
              v-text="item.hash"
              :to="{
                name: ROUTES.NAME.TRANSACTIONS_DETAIL,
                params: { id: item.hash },
              }"
            />
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'BlocksViewDetailTransactions',
  props: {
    items: {
      type: Array,
      required: true,
      note: 'The transactions to display',
    },
    height: {
      type: String,
      required: true,
      note: 'The transactions height',
    },
  },
  data: () => ({
    ROUTES,
    sortBy: 'result',
    sortDesc: true,
  }),
  computed: {
    headers() {
      return [
        { text: this.$t('labels.result'), value: 'result' },
        { text: this.$t('labels.type'), value: 'type' },
        { text: this.$t('labels.hash'), value: 'hash' },
      ];
    },
  },
};
</script>

<style scoped>
.word-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12.5rem;
}
</style>
