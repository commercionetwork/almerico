<template>
  <v-select
    append-icon="mdi-filter-outline"
    :label="$t('labels.filter')"
    :items="items"
    item-text="label"
    item-value="status"
    return-object
    v-model="select"
    @change="filtering"
  >
    <template v-slot:prepend>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="info" dark v-bind="attrs" v-on="on">
            mdi-information-outline
          </v-icon>
        </template>
        <span v-html="$t('msgs.filterValidatorsInfo')" />
      </v-tooltip>
    </template>
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
