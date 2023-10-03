<template>
  <v-text-field
    dense
    outlined
    persistent-placeholder
    type="number"
    :error-messages="errors"
    :id="id"
    :label="label"
    :step="step"
    v-model="model"
  >
    <template #label>
      <div class="font-weight-bold">
        <span v-text="label" />
      </div>
    </template>
  </v-text-field>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'BaseFormNumberField',
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: () => uuidv4(),
    },
    label: {
      type: String,
      default: 'label',
    },
    step: {
      type: String,
      default: '0.01',
    },
    value: {
      type: String,
    },
  },
  emits: ['input'],
  computed: {
    model: {
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
