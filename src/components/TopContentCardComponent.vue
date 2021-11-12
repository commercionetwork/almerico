<template>
  <v-card outlined>
    <v-card-title
      class="justify-center text-center text-truncate text-overline font-weight-bold"
      v-html="title"
    />
    <v-spacer />
    <v-card-text class="text-center card-text">
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
