<template>
  <v-alert
    class="ma-1"
    dense
    dismissible
    :icon="alertIcon"
    :type="alertType"
    v-model="isVerified"
    @input="reset"
  >
    <div class="text-h6" v-text="resultMessage" />
    <div class="py-2 text-body-2 font-weight-bold" v-text="hash" />
    <div class="text-body-2" v-text="descriptionMessage" />
  </v-alert>
</template>

<script>
import { mdiAlertCircle, mdiCheckCircle } from '@mdi/js';

export default {
  name: 'TransactionsViewSharedocResult',
  props: {
    hash: {
      type: String,
      required: true,
    },
    reset: {
      type: Function,
      required: true,
    },
    result: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['input'],
  computed: {
    isVerified: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    alertType() {
      return this.result ? 'success' : 'error';
    },
    alertIcon() {
      return this.result ? mdiCheckCircle : mdiAlertCircle;
    },
    descriptionMessage() {
      return this.result
        ? this.$t('msgs.filesCorrespond')
        : this.$t('msgs.filesNotCorrespond');
    },
    resultMessage() {
      return this.result
        ? this.$t('msgs.verificationSuccess')
        : this.$t('msgs.verificationFailed');
    },
  },
};
</script>
