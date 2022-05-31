<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :custom-filter="filterValidators"
        :headers="headers"
        :hide-default-footer="true"
        :items="items"
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
          <v-btn
            icon
            @click="handleBookmark(item.operatorAddress, item.bookmark)"
          >
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
              params: { id: item.operatorAddress },
            }"
          />
        </template>
        <template #[`item.tokens`]="{ item }">
          <span class="text-uppercase" v-text="formatAsTokens(item.tokens)" />
        </template>
        <template #[`item.commission`]="{ item }">
          <span v-text="formatAsPercentage(item.commission)" />
        </template>
        <template #[`item.votingPower`]="{ item }">
          <span v-text="formatAsPercentage(item.power)" />
        </template>
        <template #[`item.cumulative`]="{ item }">
          <span v-text="formatAsPercentage(item.cumulative)" />
        </template>
        <template #[`item.attendance`]="{ item }">
          <span v-text="formatAsPercentage(item.attendance)" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import validatorsStorageHandler from '../helpers/validatorsStorageHandler';
import validatorsTableHelper from './helpers/validatorsTableHelper';

import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';
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
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('validators', ['list', 'filter']),
    caption() {
      return validatorsTableHelper.getCaption(this.filter, this.$t, this);
    },
    headers() {
      return validatorsTableHelper.getHeaders(this.$t, this);
    },
    items() {
      return validatorsTableHelper.getItems({
        validators: this.list,
        bookmarks: this.bookmarks,
        filter: this.filter,
      });
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
      const props = [item.moniker, item.operatorAddress, item.account];
      let found = false;
      for (const prop of props) {
        if (prop.toLowerCase().includes(search.toLowerCase())) {
          found = true;
          break;
        }
      }
      return found;
    },
    formatAsPercentage(amount) {
      if (!amount) return '-';
      return new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(amount);
    },
    formatAsTokens(tokens) {
      return coinAdapter.format({
        amount: parseInt(tokens),
        denom: this.stakingParams.bond_denom,
      });
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
