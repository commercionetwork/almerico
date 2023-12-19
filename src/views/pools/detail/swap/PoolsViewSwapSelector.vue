<template>
  <v-row class="d-flex align-center">
    <v-col cols="12" md="5">
      <div class="text-center text-subtitle-1">
        <div
          class="text-lowercase font-italic"
          v-text="$t('labels.fromToken')"
        />
        <div class="text-uppercase font-weight-bold" v-text="tokenFrom.denom" />
      </div>
    </v-col>
    <v-col cols="12" md="2">
      <div class="text-center">
        <v-btn outlined @click="reverse">
          <span v-text="$t('labels.reverse')" />
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="5">
      <div class="text-center text-subtitle-1">
        <div class="text-lowercase font-italic" v-text="$t('labels.toToken')" />
        <div class="text-uppercase font-weight-bold" v-text="tokenTo.denom" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PoolsViewSwapSelector',
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
  methods: {
    reverse() {
      this.$emit('reverse');
    },
  },
};
</script>
