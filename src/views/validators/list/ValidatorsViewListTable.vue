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
            class="py-1 px-3 text-caption rounded-circle d-inline-block"
            :class="item.active ? 'primary' : 'error'"
          >
            <span class="font-weight-bold white--text" v-text="item.rank" />
          </div>
        </template>
        <template #[`item.moniker`]="{ item }">
          <ValidatorsViewListTableValidator
            :address="item.operator_address"
            :bookmark="item.bookmark"
            :logo="item.logo"
            :moniker="item.moniker"
            v-on:handle-bookmark="onHandleBookmark"
          />
        </template>
        <template #[`item.tokens`]="{ item }">
          <span
            class="text-caption text-uppercase"
            v-text="formatAsTokens(item.tokens)"
          />
        </template>
        <template #[`item.commission`]="{ item }">
          <span
            class="text-caption"
            v-text="formatAsPercentage(item.commission)"
          />
        </template>
        <template #[`item.votingPower`]="{ item }">
          <span class="text-caption" v-text="formatAsPercentage(item.power)" />
        </template>
        <template #[`item.cumulative`]="{ item }">
          <span
            class="text-caption"
            v-text="formatAsPercentage(item.cumulative)"
          />
        </template>
        <template #[`item.attendance`]="{ item }">
          <span
            class="text-caption"
            v-text="formatAsPercentage(item.attendance)"
          />
        </template>
        <template #[`item.operator_address`]="{ item }">
          <ValidatorManager
            :address="item.operator_address"
            :commission="item.commission"
            :moniker="item.moniker"
          />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import ValidatorManager from './manager/ValidatorManager.vue';
import ValidatorsViewListTableValidator from './ValidatorsViewListTableValidator.vue';
import validatorsTableHelper from './helpers/validatorsTableHelper';

import { CONFIG } from '@/constants';
import { coinAdapter, storageHandler } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewListTable',
  components: {
    ValidatorManager,
    ValidatorsViewListTableValidator,
  },
  data() {
    return {
      bookmarks: [],
      sortBy: 'rank',
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
        bookmarks: this.bookmarks,
        filter: this.filter,
        validators: this.list,
      });
    },
  },
  created() {
    this.bookmarks = storageHandler.get(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS);
  },
  methods: {
    filterValidators(_value, search, item) {
      if (typeof search.trim() !== 'string') {
        return;
      }
      const props = [item.moniker, item.operator_address, item.account];
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
    onHandleBookmark() {
      this.bookmarks = storageHandler.get(
        CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS
      );
    },
  },
};
</script>
