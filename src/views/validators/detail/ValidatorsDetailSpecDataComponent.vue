<template>
  <div class="pa-1">
    <div class="text-capitalize font-weight-bold" v-text="label" />
    <div v-text="value" />
  </div>
</template>

<script>
export default {
  name: 'ValidatorsDetailSpecDataComponent',
  props: {
    label: {
      type: String,
      required: true,
      note: 'The value label',
    },
    value: {
      type: String,
      required: true,
      note: 'The value to display',
    },
  },
};
</script>
