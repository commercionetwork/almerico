<template>
  <div class="pt-1 d-flex justify-space-around">
    <v-btn
      text
      small
      class="font-weight-bold"
      :class="range === HOME.RANGE.TODAY ? 'info--text' : 'grey--text'"
      v-text="$t(`home.${HOME.RANGE.TODAY}`)"
      @click="onChangeRange(HOME.RANGE.TODAY)"
    />
    <v-btn
      text
      small
      class="font-weight-bold"
      :class="range === HOME.RANGE.WEEK ? 'info--text' : 'grey--text'"
      v-text="$t(`home.${HOME.RANGE.WEEK}`)"
      @click="onChangeRange(HOME.RANGE.WEEK)"
    />
    <v-btn
      text
      small
      class="font-weight-bold"
      :class="range === HOME.RANGE.MONTH ? 'info--text' : 'grey--text'"
      v-text="$t(`home.${HOME.RANGE.MONTH}`)"
      @click="onChangeRange(HOME.RANGE.MONTH)"
    />
  </div>
</template>

<script>
import { HOME } from '@/constants';

export default {
  name: 'HomePriceChartRangeComponent',
  data: () => ({
    HOME,
    range: HOME.RANGE.MONTH,
  }),
  methods: {
    onChangeRange(range) {
      this.range = range;
      this.$emit('range-changed', this.range);
    },
  },
};
</script>
