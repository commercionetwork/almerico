<template>
  <v-layout justify-center align-center>
    <v-progress-circular
      :color="color"
      :indeterminate="indeterminate"
      :rotate="rotate"
      :size="size"
      :value="value"
      :width="width"
    ></v-progress-circular>
  </v-layout>
</template>

<script>
export default {
  name: 'BaseLoadingCircular',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    indeterminate: {
      type: Boolean,
      default: true,
    },
    rotate: {
      type: String,
      default: '0',
    },
    size: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 15,
    },
  },
};
</script>
