<template>
  <v-card class="pa-1">
    <v-card-title
      class="justify-center text-center text-truncate text-overline font-weight-bold"
      v-html="title"
    />
    <v-card-subtitle
      class="text-center text-overline primary--text"
      v-html="info"
    />
    <v-spacer />
    <v-card-text class="text-center card-text">
      <slot name="content" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TopBodyCardComponent',
  props: {
    title: {
      type: String,
      default: '',
      note: 'Main title',
    },
    info: {
      type: String,
      default: '',
      note: 'Additional infos',
    },
  },
};
</script>

<style scoped>
.card-text {
  overflow-y: auto;
  height: 150px;
}
</style>
