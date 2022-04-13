<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :custom-filter="filterValidators"
        :headers="headers"
        :hide-default-footer="true"
        :items="items"
        :loading="isLoadingBlocks"
        :search="filter.query"
        :sort-by.sync="sortBy"
        disable-pagination
      >
        <template #top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="caption"
          />
        </template>
        <template #[`item.rank`]="{ item }">
          <div
            class="py-1 px-3 rounded-circle d-inline-block"
            :class="item.active ? 'primary' : 'error'"
          >
            <span class="font-weight-bold white--text" v-text="item.rank" />
          </div>
        </template>
        <template #[`item.moniker`]="{ item }">
          <v-btn icon @click="handleBookmark(item.operator, item.bookmark)">
            <v-icon v-if="item.bookmark" color="amber darken-2">
              {{ mdiStar }}
            </v-icon>
            <v-icon v-else color="amber darken-2">{{ mdiStarOutline }}</v-icon>
          </v-btn>
          <v-avatar>
            <v-img
              v-if="item.logo"
              :src="item.logo"
              max-height="20"
              max-width="20"
            />
            <v-icon v-else color="grey lighten-1" size="20">
              {{ mdiCog }}
            </v-icon>
          </v-avatar>
          <router-link
            class="text-decoration-none font-weight-bold"
            v-text="item.moniker"
            :to="{
              name: ROUTES.NAME.VALIDATORS_DETAIL,
              params: { id: item.operator },
            }"
          />
        </template>
        <template #[`item.tokens`]="{ item }">
          <span class="text-uppercase" v-text="item.tokens" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import validatorsStorageHandler from '../helpers/validatorsStorageHandler';
import validatorsTableAdapter from './helpers/validatorsTableAdapter';

import { CONFIG, ROUTES, VALIDATORS } from '@/constants';
import { mapGetters } from 'vuex';
import { mdiCog, mdiStar, mdiStarOutline } from '@mdi/js';

export default {
  name: 'ValidatorsViewListTable',
  data() {
    return {
      ROUTES,
      mdiCog,
      mdiStar,
      mdiStarOutline,
      sortBy: 'rank',
      bookmarks: [],
    };
  },
  computed: {
    ...mapGetters('application', ['stakingParams', 'validators']),
    ...mapGetters('validators', [
      'blocks',
      'isLoadingBlocks',
      'filter',
      'pool',
    ]),
    bondDenom() {
      return this.stakingParams.bond_denom ? this.stakingParams.bond_denom : '';
    },
    caption() {
      switch (this.filter.status) {
        case VALIDATORS.FILTER.ACTIVE:
          return this.$t('titles.activeValidatorsList');
        case VALIDATORS.FILTER.INACTIVE:
          return this.$t('titles.inactiveValidatorsList');
        case VALIDATORS.FILTER.BOOKMARK:
          return this.$t('titles.myValidators');
        default:
          return this.$t('titles.validatorsList');
      }
    },
    items() {
      return validatorsTableAdapter.build({
        validators: this.validators,
        accountPrefix: CONFIG.PREFIXES.ACCOUNT.ADDRESS,
        blocks: this.blocks,
        coin: this.bondDenom,
        pool: this.pool,
        bookmarks: this.bookmarks,
        filter: this.filter,
      });
    },
    headers() {
      let headers = [
        { text: this.$t('labels.rank'), value: 'rank' },
        { text: this.$t('labels.validator'), value: 'moniker' },
        { text: this.$t('labels.tokens'), value: 'tokens' },
        { text: this.$t('labels.commission'), value: 'commission' },
        { text: this.$t('labels.votingPower'), value: 'votingPower' },
        { text: this.$t('labels.cumulative'), value: 'cumulative' },
      ];
      if (VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY) {
        headers.push({
          text: this.$t('labels.blocksPercentage'),
          value: 'attendance',
        });
      }
      return headers;
    },
  },
  created() {
    this.bookmarks = validatorsStorageHandler.get();
  },
  methods: {
    filterValidators(_value, search, item) {
      if (typeof search.trim() !== 'string') {
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
    },
    handleBookmark(address, status) {
      if (status) {
        validatorsStorageHandler.remove(address);
      } else {
        validatorsStorageHandler.set(address);
      }
      this.bookmarks = validatorsStorageHandler.get();
    },
  },
};
</script>
