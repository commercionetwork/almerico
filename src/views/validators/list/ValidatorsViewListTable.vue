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
              max-height="30"
              max-width="30"
            >
              <template v-slot:placeholder>
                <v-progress-circular
                  :width="2"
                  indeterminate
                  color="grey lighten-1"
                ></v-progress-circular>
              </template>
            </v-img>
            <v-icon v-else color="grey lighten-1" size="30">
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
          <span class="text-uppercase" v-text="formatTokens(item.tokens)" />
        </template>
        <template #[`item.commission`]="{ item }">
          <span v-text="getPercentage(item.commission)" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import validatorsStorageHandler from '../helpers/validatorsStorageHandler';
import validatorsListHelper from './helpers/validatorsListHelper';

import { coinAdapter } from '@/utils';
import { ROUTES, VALIDATORS } from '@/constants';
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
      items: [],
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
    headers() {
      return validatorsListHelper.getHeaders(this.$t, this);
    },
  },
  watch: {
    filter() {
      this.setValidators();
    },
  },
  created() {
    this.setValidators();
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
    setValidators() {
      this.bookmarks = validatorsStorageHandler.get();
      this.items = validatorsListHelper.getItems({
        validators: this.validators,
        bookmarks: this.bookmarks,
        filter: this.filter,
      });
    },
    handleBookmark(address, status) {
      if (status) {
        validatorsStorageHandler.remove(address);
      } else {
        validatorsStorageHandler.set(address);
      }
      this.setValidators();
    },
    formatTokens(tokens) {
      return coinAdapter.format({
        amount: parseInt(tokens),
        denom: this.stakingParams.bond_denom,
      });
    },
    getPercentage(amount) {
      return new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(amount);
    },
  },
};
</script>
