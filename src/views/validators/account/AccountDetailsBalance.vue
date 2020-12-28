<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :hide-default-header="true"
    :hide-default-footer="true"
    disable-pagination
    class="elevation-2"
  >
    <template v-slot:[`item.caption`]="{ item }">
      <span class="text-capitalize" v-text="item.caption" />
    </template>
    <template v-slot:[`item.amount`]="{ item }">
      <span class="font-weight-bold" v-text="formatTokens(item.amount)" />
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "AccountDetailsBalance",
  props: {
    amounts: {
      type: Object,
      required: true,
      note: "The amounts to display",
    },
  },
  computed: {
    headers() {
      return [
        { text: "Caption", value: "caption" },
        { text: "Amount", value: "amount" },
      ];
    },
    items() {
      return Object.keys(this.amounts).map((key) => ({
        caption: key,
        amount: this.amounts[key],
      }));
    },
  },
  methods: {
    formatTokens(value) {
      const options = {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      };
      return `${new Intl.NumberFormat(undefined, options).format(
        value / 1000000
      )} Commercio`;
    },
  },
};
</script>