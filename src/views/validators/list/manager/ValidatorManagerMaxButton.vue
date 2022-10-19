<template>
  <div class="py-2">
    <v-btn color="primary" text @click="setMax">
      <span v-text="$t('labels.max')" />
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ValidatorManagerMaxButton',
  emits: ['set-max'],
  methods: {
    setMax() {
      this.$emit('set-max');
    },
  },
};
</script>
