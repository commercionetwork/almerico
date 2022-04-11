<template>
  <BaseTopContentCard :title="$t('titles.filterProposals')">
    <template #content>
      <div class="fill-height">
        <v-form>
          <v-row>
            <v-col cols="10" offset="1">
              <v-autocomplete
                :items="items"
                :placeholder="$t('msgs.startTypingToFilterStatus')"
                :prepend-inner-icon="mdiMagnify"
                dense
                hide-no-data
                hide-selected
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
import { mdiMagnify } from '@mdi/js';

export default {
  name: 'ProposalsViewListSearch',
  components: { BaseTopContentCard },
  data: () => ({
    mdiMagnify,
    nameLimit: 60,
    selectedStatus: '',
  }),
  computed: {
    items() {
      const statuses = Object.values(PROPOSALS.STATUS);
      return statuses
        .filter(
          (status) => status['CODE'] !== PROPOSALS.STATUS.UNSPECIFIED.CODE
        )
        .map((status) => status['CODE']);
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
