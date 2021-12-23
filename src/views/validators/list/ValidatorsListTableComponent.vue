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
        <template v-slot:top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('titles.validatorsList')"
          />
        </template>
        <template v-slot:[`item.rank`]="{ item }">
          <div
            class="py-1 px-3 rounded-circle d-inline-block"
            :class="item.active ? 'primary' : 'error'"
          >
            <span class="font-weight-bold white--text" v-text="item.rank" />
          </div>
        </template>
        <template v-slot:[`item.moniker`]="{ item }">
          <router-link
            class="text-decoration-none font-weight-bold"
            v-text="item.moniker"
            :to="{
              name: ROUTES.NAME.VALIDATORS_DETAIL,
              params: { id: item.operator },
            }"
          />
          <v-btn icon @click="handleBookmark(item.operator, item.bookmark)">
            <v-icon v-if="item.bookmark" color="amber darken-2">
              mdi-star
            </v-icon>
            <v-icon v-else color="amber darken-2">mdi-star-outline</v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.tokens`]="{ item }">
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

export default {
  name: 'ValidatorsListTableComponent',
  data: () => ({
    ROUTES,
    sortBy: 'rank',
    bookmarks: [],
  }),
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
      validators: 'validators',
    }),
    ...mapGetters('validators', {
      blocks: 'blocks',
      filter: 'filter',
      pool: 'pool',
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : '';
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
  created() {
    this.bookmarks = validatorsStorageHandler.get();
  },
};
</script>
