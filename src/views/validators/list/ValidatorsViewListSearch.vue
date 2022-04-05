<template>
  <BaseTopContentCard :title="$t('titles.searchValidator')">
    <template #content>
      <div
        class="fill-height d-flex flex-column justify-space-around align-content-space-around"
      >
        <div class="px-3">
          <v-text-field
            :append-icon="mdiMagnify"
            :label="$t('labels.searchNameAddressAccount')"
            v-model="query"
            @input="search"
            @blur="search"
          >
            <template #prepend>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-icon color="info" dark v-bind="attrs" v-on="on">
                    {{ mdiInformationOutline }}
                  </v-icon>
                </template>
                <span v-text="$t('msgs.searchValidatorsInfo')" />
              </v-tooltip>
            </template>
          </v-text-field>
        </div>
        <div class="px-3">
          <ValidatorsViewListFilter @filter="onFilter" />
        </div>
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';
import ValidatorsViewListFilter from './ValidatorsViewListFilter.vue';

import { VALIDATORS } from '@/constants';
import { mapActions } from 'vuex';
import { mdiInformationOutline, mdiMagnify } from '@mdi/js';

export default {
  name: 'ValidatorsViewListSearch',
  components: {
    ValidatorsViewListFilter,
    BaseTopContentCard,
  },
  data: () => ({
    mdiInformationOutline,
    mdiMagnify,
    status: VALIDATORS.FILTER.ACTIVE,
    query: '',
  }),
  methods: {
    ...mapActions('validators', ['setValidatorsFilter']),
    onFilter(filter) {
      this.status = filter;
      this.search();
    },
    search() {
      this.setValidatorsFilter({
        status: this.status,
        query: this.query,
      });
    },
  },
};
</script>
