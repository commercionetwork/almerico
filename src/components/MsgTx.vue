<template>
  <v-card elevation="2" class="mb-3">
    <v-card-text>
      <v-list class="ma-1 text-break">
        <v-list-item-title class="pl-1 font-weight-bold" v-text="title" />
        <v-divider />
        <slot name="body" />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MsgTx',
  description: 'Container for a transaction message',
  props: {
    title: {
      type: String,
      default: () => 'Not Managed Type',
      note: 'The transaction type',
    },
  },
};
</script>
