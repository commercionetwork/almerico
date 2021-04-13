<template>
  <div class="pt-1 d-flex justify-space-around">
    <v-btn
      text
      small
      class="font-weight-bold"
      :class="range === RANGE.TODAY ? 'info--text' : 'grey--text'"
      v-text="RANGE.TODAY"
      @click="onChangeRange(RANGE.TODAY)"
    />
    <v-btn
      text
      small
      class="font-weight-bold"
      :class="range === RANGE.WEEK ? 'info--text' : 'grey--text'"
      v-text="RANGE.WEEK"
      @click="onChangeRange(RANGE.WEEK)"
    />
    <v-btn
      text
      small
      class="font-weight-bold"
      :class="range === RANGE.MONTH ? 'info--text' : 'grey--text'"
      v-text="RANGE.MONTH"
      @click="onChangeRange(RANGE.MONTH)"
    />
  </div>
</template>

<script>
import { RANGE } from '@/constants';

export default {
  name: 'DashboardPriceChartRange',
  data: () => ({
    RANGE,
    range: RANGE.MONTH,
  }),
  methods: {
    onChangeRange(range) {
      this.range = range;
      this.$emit('range-changed', this.range);
    },
  },
};
</script>
