<template>
  <v-alert
    class="ma-1"
    dense
    dismissible
    type="info"
    v-model="isUnsupported"
    @input="reset"
  >
    <div class="text-body-2" v-text="$t('msgs.unsupportedAlgorithm')" />
  </v-alert>
</template>

<script>
export default {
  name: 'TransactionsViewSharedocUnsupported',
  props: {
    reset: {
      type: Function,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['input'],
  computed: {
    isUnsupported: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
