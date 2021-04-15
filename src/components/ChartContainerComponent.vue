<template>
  <v-card outlined>
    <v-card-text>
      <div class="d-flex justify-center">
        <slot name="chart" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChartContainerComponent',
};
</script>
