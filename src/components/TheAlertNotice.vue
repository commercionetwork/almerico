<template>
  <v-alert
    :dismissible="dismissible"
    :type="kind"
    border="left"
    outlined
    prominent
    text
  >
    <v-row align="center">
      <v-col class="grow text-body-1">
        <span v-html="message" />
      </v-col>
      <v-col class="shrink">
        <slot name="action" />
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: 'TheAlertNotice',
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
