<template>
  <v-card outlined class="mb-3">
    <v-card-text>
      <v-list class="ma-1 text-break">
        <v-list-item-title class="font-weight-bold" v-text="title" />
        <v-list-item-subtitle
          class="text-capitalize font-italic"
          v-text="subtitle"
        />
        <v-divider />
        <slot name="body" />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TxMsgComponent',
  description: 'Container for a transaction message',
  props: {
    subtitle: {
      type: String,
      default: () => this.$t('msgs.notSupportedMsgSource'),
      note: 'The transaction type source',
    },
    title: {
      type: String,
      default: () => this.$t('msgs.notSupportedMsgType'),
      note: 'The transaction type',
    },
  },
};
</script>
