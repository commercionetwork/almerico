<template>
  <v-alert
    :dismissible="dismissible"
    :type="kind"
    border="left"
    outlined
    prominent
    text
  >
    <span class="text-body-1" v-html="message" />
  </v-alert>
</template>

<script>
export default {
  name: 'AlertComponent',
  props: {
    dismissible: {
      type: Boolean,
      default: false,
      note: 'Enable the dismissible button',
    },
    kind: {
      type: String,
      required: true,
      note: 'The alert type',
    },
    message: {
      type: String,
      required: true,
      note: 'The message to display',
    },
  },
};
</script>
