<template>
  <v-card outlined class="mb-3" :id="id">
    <v-card-text>
      <v-list class="text-break">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="pb-1 font-weight-bold" v-text="title" />
            <v-list-item-subtitle
              class="pb-1 text-capitalize font-italic"
              v-if="subtitle"
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
    id: {
      type: String,
      default: '',
      note: 'The message id',
    },
    subtitle: {
      type: String,
      default: '',
      note: 'The message source',
    },
    title: {
      type: String,
      default: function () {
        return this.$t('titles.message');
      },
      note: 'The message type',
    },
  },
};
</script>
