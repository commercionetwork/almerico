<template>
  <v-card outlined class="pa-3">
    <v-card-text>
      <v-data-table
        dense
        :headers="headers"
        :items="items"
        :item-class="getRowStyle"
        :hide-default-footer="true"
        disable-pagination
      >
        <template #[`header.label`]="{ header }">
          <span v-text="header.text.toUpperCase()" />
        </template>
        <template #[`item.label`]="{ item }">
          <span class="text-capitalize" v-text="item.label" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ExchangeRateViewTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
      note: 'The table headers',
    },
    items: {
      type: Array,
      default: () => [],
      note: 'The table data',
    },
    getRowStyle: {
      type: Function,
      default: () => '',
      note: 'Set the table row style',
    },
  },
};
</script>
