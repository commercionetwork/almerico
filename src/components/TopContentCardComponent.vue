<template>
  <v-card
    outlined
    class="d-flex flex-column justify-space-between align-center"
  >
    <v-card-title
      class="text-truncate text-overline font-weight-bold"
      v-html="title"
    />
    <v-card-text class="card-text">
      <slot name="content" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TopContentCardComponent',
  props: {
    title: {
      type: String,
      default: '&nbsp;',
      note: 'Main title',
    },
  },
};
</script>

<style scoped>
.card-text {
  overflow-y: auto;
  height: 175px;
}
</style>
