<template>
  <div class="pt-1 d-flex justify-space-around">
    <v-btn
      text
      small
      class="font-weight-bold grey--text"
      :class="{ 'info--text': range === HOME.RANGE.TODAY }"
      @click="onChangeRange(HOME.RANGE.TODAY)"
    >
      <span v-text="$t(`home.${HOME.RANGE.TODAY}`)" />
    </v-btn>
    <v-btn
      text
      small
      class="font-weight-bold grey--text"
      :class="{ 'info--text': range === HOME.RANGE.WEEK }"
      @click="onChangeRange(HOME.RANGE.WEEK)"
    >
      <span v-text="$t(`home.${HOME.RANGE.WEEK}`)" />
    </v-btn>
    <v-btn
      text
      small
      class="font-weight-bold grey--text"
      :class="{ 'info--text': range === HOME.RANGE.MONTH }"
      @click="onChangeRange(HOME.RANGE.MONTH)"
    >
      <span v-text="$t(`home.${HOME.RANGE.MONTH}`)" />
    </v-btn>
  </div>
</template>

<script>
import { HOME } from '@/constants';

export default {
  name: 'HomeViewChartPriceRange',
  emits: [`range-changed`],
  data() {
    return {
      HOME,
      range: HOME.RANGE.MONTH,
    };
  },
  methods: {
    onChangeRange(range) {
      this.range = range;
      this.$emit('range-changed', this.range);
    },
  },
};
</script>
