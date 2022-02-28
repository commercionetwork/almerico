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
        <template v-slot:top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('labels.delegatedTokens')"
          />
        </template>
        <template v-slot:[`item.caption`]="{ item }">
          <span class="text-capitalize" v-text="item.caption" />
        </template>
        <template v-slot:[`item.amount`]="{ item }">
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
import { mapGetters } from 'vuex';
import { coinAdapter } from '@/utils';

export default {
  name: 'ValidatorsViewDetailDelegations',
  props: {
    delegations: {
      type: Object,
      required: true,
      note: 'The items to display',
    },
  },
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
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
        denom: this.params.bond_denom,
      });
    },
  },
};
</script>
