<template>
  <v-card outlined>
    <v-card-title
      v-if="title !== ''"
      v-text="title"
      class="d-flex justify-center text-overline font-weight-bold"
    />
    <v-card-text>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <div class="chart-container">
            <slot name="chart" />
          </div>
        </v-col>
      </v-row>
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
.chart-container {
  position: relative;
  max-height: 60%;
  max-width: 90%;
}
</style>
