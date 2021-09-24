<template>
  <v-card outlined>
    <v-card-title
      v-if="title"
      v-text="title"
      class="d-flex justify-center text-overline font-weight-bold"
    />
    <v-card-text class="text-center card-text">
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

<style scoped>
.card-text {
  position: relative;
  max-height: 60%;
  max-width: 90%;
}
.chart-container {
  position: relative;
  max-height: 60%;
  max-width: 90%;
}
</style>
