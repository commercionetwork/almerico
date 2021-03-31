<template>
  <v-card outlined class="mb-3">
    <v-card-text>
      <v-list dense class="ma-1 text-break">
        <v-list-item-title class="font-weight-bold" v-text="title" />
        <v-list-item-subtitle class="text-capitalize font-weight-medium font-italic" v-text="subTitle" />
        <v-divider />
        <slot name="body" />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MsgTxComponent',
  description: 'Container for a transaction message',
  props: {
    subTitle: {
      type: String,
      default: () => 'Not Managed Msg Source',
      note: 'The transaction type source',
    },
    title: {
      type: String,
      default: () => 'Not Managed Type',
      note: 'The transaction type',
    },
  },
};
</script>
