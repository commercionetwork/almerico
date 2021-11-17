<template>
  <v-card outlined class="mb-3">
    <v-card-text>
      <v-list class="text-break">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="pb-1 font-weight-bold" v-text="title" />
            <v-list-item-subtitle
              class="pb-1 text-capitalize font-italic"
              v-text="subtitle"
            />
          </v-list-item-content>
        </v-list-item>
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
      default: function () {
        return this.$t('msgs.notSupportedMsgSource');
      },
      note: 'The transaction type source',
    },
    title: {
      type: String,
      default: function () {
        return this.$t('msgs.notSupportedMsgType');
      },
      note: 'The transaction type',
    },
  },
};
</script>
