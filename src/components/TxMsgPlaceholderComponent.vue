<template>
  <v-card outlined class="mb-3" :id="id">
    <v-card-text v-text="$t('msgs.loading')" />
  </v-card>
</template>

<script>
export default {
  name: 'TxMsgPlaceholderComponent',
  props: {
    id: {
      type: String,
      default: '',
      note: 'The message id',
    },
  },
};
</script>
