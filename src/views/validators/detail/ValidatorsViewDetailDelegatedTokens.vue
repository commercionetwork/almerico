<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-text>
      <v-data-table
        :headers="headers"
        :hide-default-footer="true"
        :items="items"
        disable-pagination
      >
        <template #top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('labels.delegatedTokens')"
          />
        </template>
        <template #[`item.caption`]="{ item }">
          <span class="text-capitalize" v-text="item.caption" />
        </template>
        <template #[`item.amount`]="{ item }">
          <span
            class="text-uppercase font-weight-bold"
            v-text="formatTokens(item.amount)"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { coinAdapter } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetailDelegatedTokens',
  props: {
    delegations: {
      type: Object,
      required: true,
      note: 'The items to display',
    },
  },
  computed: {
    ...mapGetters('application', ['stakingParams']),
    headers() {
      return [
        { text: this.$t('labels.caption'), value: 'caption' },
        { text: this.$t('labels.amount'), value: 'amount' },
      ];
    },
    items() {
      return Object.keys(this.delegations).map((key) => ({
        caption: key,
        amount: this.delegations[key],
      }));
    },
  },
  methods: {
    formatTokens(value) {
      return coinAdapter.format({
        amount: value,
        denom: this.stakingParams.bond_denom,
      });
    },
  },
};
</script>
