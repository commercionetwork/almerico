<template>
  <v-card outlined>
    <v-card-title
      class="justify-center text-center text-truncate text-overline font-weight-bold"
      v-html="title"
    />
    <v-spacer />
    <v-card-text>
      <slot name="chart" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChartContainerComponent',
  props: {
    title: {
      type: String,
      default: '',
      note: 'The chart title',
    },
  },
};
</script>
