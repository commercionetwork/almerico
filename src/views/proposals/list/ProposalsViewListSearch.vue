<template>
  <BaseTopContentCard :title="$t('titles.filterProposals')">
    <template #content>
      <div class="fill-height">
        <v-form>
          <v-row>
            <v-col cols="10" offset="1">
              <v-autocomplete
                :items="items"
                :placeholder="$t('msgs.filterByStatus')"
                :prepend-inner-icon="mdiFilterOutline"
                dense
                hide-no-data
                hide-selected
                item-text="text"
                item-value="value"
                outlined
                v-model="selectedStatus"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" offset="2">
              <v-btn
                @click="filter(true)"
                block
                color="primary"
                depressed
                v-text="$t('labels.filter')"
              />
            </v-col>
            <v-col cols="4">
              <v-btn
                @click="filter(false)"
                block
                color="secondary"
                outlined
                v-text="$t('labels.reset')"
              />
            </v-col>
          </v-row>
        </v-form>
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

import { PROPOSALS } from '@/constants';
import { mdiFilterOutline } from '@mdi/js';

export default {
  name: 'ProposalsViewListSearch',
  components: { BaseTopContentCard },
  data() {
    return {
      mdiFilterOutline,
      nameLimit: 60,
      selectedStatus: '',
    };
  },
  computed: {
    items() {
      const keys = Object.keys(PROPOSALS.TEXTS);
      return keys.map((k) => ({ text: PROPOSALS.TEXTS[k], value: k }));
    },
  },
  methods: {
    filter(isFilter) {
      if (!isFilter) {
        this.selectedStatus = '';
      }
      this.$parent.$emit('filter-proposals', this.selectedStatus);
    },
  },
};
</script>
