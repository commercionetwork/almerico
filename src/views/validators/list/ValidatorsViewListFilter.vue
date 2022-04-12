<template>
  <v-select
    :append-icon="mdiFilterOutline"
    :label="$t('labels.filter')"
    :items="items"
    item-text="label"
    item-value="status"
    return-object
    v-model="select"
    @change="filtering"
  >
    <template #prepend>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-icon color="info" dark v-bind="attrs" v-on="on">
            {{ mdiInformationOutline }}
          </v-icon>
        </template>
        <span v-text="$t('msgs.filterValidatorsInfo')" />
      </v-tooltip>
    </template>
  </v-select>
</template>

<script>
import { VALIDATORS } from '@/constants';
import { mdiFilterOutline, mdiInformationOutline } from '@mdi/js';

export default {
  name: 'ValidatorsViewListFilter',
  emits: [`filter`],
  data: () => ({
    mdiFilterOutline,
    mdiInformationOutline,
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
