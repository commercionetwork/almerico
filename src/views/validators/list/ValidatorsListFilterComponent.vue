<template>
  <v-container class="px-0 py-5" fluid>
    <v-radio-group v-model="filter" @blur="filtering" @change="filtering">
      <v-radio :label="$t('labels.active')" :value="VALIDATORS.FILTER.ACTIVE" />
      <v-radio
        :label="$t('labels.inactive')"
        :value="VALIDATORS.FILTER.INACTIVE"
      />
      <v-radio
        :label="$t('labels.myValidators')"
        :value="VALIDATORS.FILTER.BOOKMARK"
      />
    </v-radio-group>
  </v-container>
</template>

<script>
import { VALIDATORS } from '@/constants';

export default {
  name: 'ValidatorsListFilterComponent',
  data: () => ({
    VALIDATORS,
    filter: VALIDATORS.FILTER.ACTIVE,
  }),
  methods: {
    filtering() {
      this.$emit('filter', this.filter);
    },
  },
};
</script>
