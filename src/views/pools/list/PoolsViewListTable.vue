<template>
  <v-data-table
    :footer-props="{
      'items-per-page-options': [5, 15, 25, -1],
    }"
    :headers="headers"
    :items="items"
    :items-per-page="25"
    :search="search"
    @click:row="(item) => openDetail(item)"
  >
    <template v-slot:top>
      <v-text-field class="mx-4" :label="$t('labels.filter')" v-model="search">
        <template v-slot:prepend>
          <v-icon>
            {{ mdiFilter }}
          </v-icon>
        </template>
      </v-text-field>
    </template>
    <template #[`item.id`]="{ item }">
      <div v-text="shrinkToken(item.id)" />
    </template>
    <template #[`item.token1`]="{ item }">
      <div v-text="shrinkToken(item.token1)" />
    </template>
    <template #[`item.token2`]="{ item }">
      <div v-text="shrinkToken(item.token2)" />
    </template>
  </v-data-table>
</template>

<script>
import { mdiFilter } from '@mdi/js';
import { mapGetters } from 'vuex';
import { CONFIG, ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';

export default {
  name: 'PoolsViewListTable',
  data() {
    return {
      mdiFilter,
      search: '',
    };
  },
  computed: {
    ...mapGetters('poolsList', ['contracts']),
    items() {
      return this.contracts;
    },
    headers() {
      const headers = [
        {
          text: this.$t('labels.contract'),
          value: 'id',
        },
        {
          text: this.$t('labels.token1'),
          value: 'token1',
        },
        {
          text: this.$t('labels.token2'),
          value: 'token2',
        },
      ];
      return headers;
    },
  },
  methods: {
    openDetail(item) {
      if (!item.id) {
        return;
      }
      this.$router.push({
        name: ROUTES.NAME.POOLS_DETAIL,
        params: { id: item.id },
      });
    },
    shrinkToken(token) {
      const addressRegexp = regExpBuilder.getAddressRegExp(
        CONFIG.PREFIXES.ACCOUNT.ADDRESS
      );
      if (!addressRegexp.test(token)) {
        return token;
      }
      const l = token.length;
      return `${token.slice(0, 18)}...${token.slice(l - 3, l)}`;
    },
  },
};
</script>
