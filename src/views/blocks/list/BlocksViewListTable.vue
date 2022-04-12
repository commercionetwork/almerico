<template>
  <v-row v-if="isSearching" data-test="loading">
    <v-col cols="12" class="pa-5">
      <BaseLoadingLinear />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :hide-default-footer="true"
        :items="items"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        disable-pagination
      >
        <template #top>
          <div class="py-2 text-center text-overline font-weight-bold">
            <i18n tag="span" path="titles.blocksFromTo">
              <span v-text="firstHeight" />
              <span v-text="lastHeight" />
            </i18n>
          </div>
        </template>
        <template #[`item.height`]="{ item }">
          <router-link
            class="text-decoration-none"
            v-text="item.height"
            :to="{
              name: ROUTES.NAME.BLOCKS_DETAIL,
              params: { id: item.height },
            }"
          />
        </template>
        <template #[`item.hash`]="{ item }">
          <span
            class="d-inline-block text-truncate text-overline"
            style="max-width: 9.5rem"
          >
            {{ item.hash }}
          </span>
        </template>
        <template #[`item.moniker`]="{ item }">
          <router-link
            class="d-inline-block text-truncate text-decoration-none font-weight-bold"
            style="max-width: 9.5rem"
            v-text="item.moniker"
            :to="{
              name: ROUTES.NAME.VALIDATORS_DETAIL,
              params: { id: item.operator },
            }"
          />
        </template>
      </v-data-table>
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0.5],
        },
      }"
    >
      <BaseLoadingLinear v-if="isAddingBlocks" data-test="scrolling" />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import blocksTableAdapter from './helpers/blocksTableAdapter';
import { CONFIG, ROUTES } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksViewListTable',
  components: { BaseLoadingLinear },
  data: () => ({
    ROUTES,
    sortBy: 'height',
    sortDesc: true,
  }),
  computed: {
    ...mapGetters('application', ['validators']),
    ...mapGetters('blocks', [
      'isAddingBlocks',
      'isSearching',
      'blocks',
      'currentHeight',
    ]),
    firstHeight() {
      return this.items.length > 0
        ? this.items[this.items.length - 1].height
        : '-';
    },
    lastHeight() {
      return this.items.length > 0 ? this.items[0].height : '-';
    },
    headers() {
      return [
        { text: this.$t('labels.height'), value: 'height' },
        { text: this.$t('labels.hash'), value: 'hash' },
        { text: this.$t('labels.validator'), value: 'moniker' },
        { text: this.$t('labels.txs'), value: 'txs' },
        { text: this.$t('labels.date'), value: 'date' },
      ];
    },
    items() {
      return blocksTableAdapter.build({
        blocks: this.blocks,
        validators: this.validators,
        prefix: CONFIG.PREFIXES.VALIDATOR.CONSENSUS.ADDRESS,
      });
    },
  },
  methods: {
    ...mapActions('blocks', ['addBlocks']),
    onIntersect(_entries, _observer, isIntersecting) {
      if (isIntersecting && !this.isAddingBlocks) {
        this.addBlocks(this.currentHeight);
      }
    },
  },
};
</script>
