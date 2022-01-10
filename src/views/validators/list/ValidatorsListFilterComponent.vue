<template>
  <v-select
    :label="$t('labels.filter')"
    :items="items"
    item-text="label"
    item-value="status"
    return-object
    v-model="select"
    @change="filtering"
  >
  </v-select>
</template>

<script>
import { VALIDATORS } from '@/constants';

export default {
  name: 'ValidatorsListFilterComponent',
  data: () => ({
    select: null,
  }),
  computed: {
    items() {
      return [
        {
          label: this.$t('labels.active'),
          status: VALIDATORS.FILTER.ACTIVE,
        },
        {
          label: this.$t('labels.inactive'),
          status: VALIDATORS.FILTER.INACTIVE,
        },
        {
          label: this.$t('labels.myValidators'),
          status: VALIDATORS.FILTER.BOOKMARK,
        },
      ];
    },
  },
  methods: {
    filtering() {
      this.$emit('filter', this.select.status);
    },
  },
};
</script>
