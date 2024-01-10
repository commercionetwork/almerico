<template>
  <div class="py-3 text-center">
    <v-btn icon @click="reverse">
      <v-hover v-slot="{ hover }">
        <v-icon v-if="hover" color="orange" size="48">
          {{ mdiSwapVerticalCircleOutline }}
        </v-icon>
        <v-icon v-else size="48">
          {{ mdiArrowDownCircleOutline }}
        </v-icon>
      </v-hover>
    </v-btn>
  </div>
</template>

<script>
import {
  mdiArrowDownCircleOutline,
  mdiSwapVerticalCircleOutline,
} from '@mdi/js';

export default {
  name: 'DexViewSwapInverter',
  emits: ['reverse'],
  data() {
    return {
      mdiArrowDownCircleOutline,
      mdiSwapVerticalCircleOutline,
    };
  },
  methods: {
    reverse() {
      this.$emit('reverse');
    },
  },
};
</script>
