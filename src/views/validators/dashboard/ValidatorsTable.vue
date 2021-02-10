<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    :sort-by.sync="sortBy"
    :caption="caption"
    :hide-default-footer="true"
    disable-pagination
    class="elevation-2"
  >
    <template v-slot:[`item.moniker`]="{ item }">
      <router-link
        class="text-decoration-none font-weight-bold"
        v-text="item.moniker"
        :to="{
          name: ROUTES.NAMES.VALIDATORS_DETAILS,
          params: { id: item.operator },
        }"
      />
    </template>
    <template v-slot:[`item.active`]="{ item }">
      <span
        class="font-weight-bold"
        :class="item.active ? 'info--text' : 'error--text'"
        v-text="item.active ? 'Yes' : 'Not'"
      />
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';
import { CUSTOMIZATION, ROUTES } from '@/constants';
import { blocksHandler, ValidatorsTableAdapter } from '@/utils';

export default {
  name: 'ValidatorsTable',
  data: () => ({
    ROUTES,
    search: '',
    active: true,
    sortBy: 'rank',
  }),
  computed: {
    ...mapGetters('blocks', {
      blocks: 'blocks',
    }),
    ...mapGetters('starting', {
      params: 'params',
      pool: 'pool',
    }),
    ...mapGetters('validators', {
      filter: 'filter',
      latestValidatorsSets: 'latestValidatorsSets',
      validators: 'validators',
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : '';
    },
    items() {
      const restrictedBlocks = blocksHandler.restrictBlocks({
        blocks: this.blocks,
        prop: ['header', 'height'],
        limit: CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS,
      });
      return ValidatorsTableAdapter.setValidators(this.validators)
        .setBlocks(restrictedBlocks)
        .setCoin(this.bondDenom)
        .setPool(this.pool)
        .setValidatorsSet(this.latestValidatorsSets)
        .get();
    },
    headers() {
      let headers = [
        { text: 'Validator', value: 'moniker' },
        { text: 'Rank', value: 'rank' },
        {
          text: 'Active',
          value: 'active',
          filter: (value) => value === this.active,
        },
        { text: 'Tokens', value: 'tokens' },
        { text: 'Commission', value: 'commission' },
        { text: 'Voting Power', value: 'votingPower' },
        { text: 'Cumulative', value: 'cumulative' },
      ];
      if (this.$config.validators.isMissingBlocksChecker) {
        headers.push({ text: 'Blocks %', value: 'attendance' });
      }
      return headers;
    },
    caption() {
      return this.active
        ? 'Active validators list'
        : 'Inactive validators list';
    },
  },
  watch: {
    filter(value) {
      this.search = value.moniker;
      this.active = value.active;
    },
  },
};
</script>
