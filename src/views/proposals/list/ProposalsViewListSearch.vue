<template>
  <base-top-content-card :title="$t('titles.filterProposals')">
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
                :disabled="!selectedStatus"
              >
                <span v-text="$t('labels.filter')" />
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn @click="filter(false)" block color="secondary" outlined>
                <span v-text="$t('labels.reset')" />
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </template>
  </base-top-content-card>
</template>

<script>
import { PROPOSALS } from '@/constants';
import { mdiFilterOutline } from '@mdi/js';
import { mapActions } from 'vuex';

export default {
  name: 'ProposalsViewListSearch',
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
    ...mapActions('proposals', ['filterProposals']),
    filter(isFilter) {
      if (!isFilter) {
        this.selectedStatus = PROPOSALS.STATUS.UNSPECIFIED;
      }
      this.filterProposals(this.selectedStatus);
    },
  },
};
</script>
