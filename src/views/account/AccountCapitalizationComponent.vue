<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :hide-default-footer="true"
        disable-pagination
      >
        <template v-slot:top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('titles.comCapitalization')"
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
import { coinAdapter } from '@/utils';

export default {
  name: 'AccountCapitalizationComponent',
  props: {
    capitalization: {
      type: Object,
      required: true,
      note: 'The amounts to display',
    },
    params: {
      type: Object,
      required: true,
      note: 'The application parameters',
    },
  },
  computed: {
    headers() {
      return [
        { text: this.$t('labels.caption'), value: 'caption' },
        { text: this.$t('labels.amount'), value: 'amount' },
      ];
    },
    items() {
      return Object.keys(this.capitalization).map((key) => ({
        caption: key,
        amount: this.capitalization[key],
      }));
    },
  },
  methods: {
    formatTokens(value) {
      const denom = this.params.bond_denom ? this.params.bond_denom : '';
      return value > 0 ? coinAdapter.format({ amount: value, denom }) : '-';
    },
  },
};
</script>
