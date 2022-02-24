<template>
  <v-progress-linear
    :buffer-value="bufferValue"
    :color="color"
    :height="height"
    :value="value"
    indeterminate
    rounded
  ></v-progress-linear>
</template>

<script>
export default {
  name: 'LoadingLinearComponent',
  props: {
    bufferValue: {
      type: String,
      default: '0',
    },
    color: {
      type: String,
      default: 'primary',
    },
    height: {
      type: Number,
      default: 15,
    },
    value: {
      type: Number,
      default: 10,
    },
  },
};
</script>
