<template>
  <v-card-text class="text-center">
    <div
      class="text-body-1 text-uppercase font-weight-bold"
      v-text="getDenom(tokenFrom)"
    />
    <div class="my-3">
      <v-btn icon @click="reverse">
        <v-hover v-slot="{ hover }">
          <v-icon size="48">
            {{
              hover ? mdiSwapVerticalCircleOutline : mdiArrowDownCircleOutline
            }}
          </v-icon>
        </v-hover>
      </v-btn>
    </div>
    <div
      class="text-body-1 text-uppercase font-weight-bold"
      v-text="getDenom(tokenTo)"
    />
  </v-card-text>
</template>

<script>
import {
  mdiArrowDownCircleOutline,
  mdiSwapVerticalCircleOutline,
} from '@mdi/js';

export default {
  name: 'DexViewSwapSelector',
  props: {
    tokenFrom: {
      type: Object,
      required: true,
    },
    tokenTo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mdiArrowDownCircleOutline,
      mdiSwapVerticalCircleOutline,
    };
  },
  methods: {
    getDenom(token) {
      return token.denom;
    },
    reverse() {
      this.$emit('reverse');
    },
  },
};
</script>
