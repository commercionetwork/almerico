<template>
  <BaseTopContentCard :title="$t('titles.searchTxs')">
    <template #content>
      <div class="fill-height">
        <v-form>
          <v-row>
            <v-col cols="10" offset="1">
              <v-autocomplete
                :items="items"
                :label="$t('labels.type')"
                :loading="isLoading"
                :placeholder="$t('msgs.startTypingToFilterTypes')"
                :prepend-inner-icon="mdiMagnify"
                dense
                hide-no-data
                hide-selected
                item-text="name"
                item-value="name"
                outlined
                v-model="selectedType"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" offset="2">
              <v-btn
                @click="search(true)"
                block
                color="primary"
                depressed
                v-text="$t('labels.search')"
              />
            </v-col>
            <v-col cols="4">
              <v-btn
                @click="search(false)"
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

import { TRANSACTIONS } from '@/constants';
import { mapGetters } from 'vuex';
import { mdiMagnify } from '@mdi/js';

export default {
  name: 'TransactionsViewListSearch',
  components: { BaseTopContentCard },
  data() {
    return {
      mdiMagnify,
      nameLimit: 60,
      selectedType: '',
    };
  },
  computed: {
    ...mapGetters('transactions', ['isLoading']),
    items() {
      return TRANSACTIONS.SUPPORTED_TYPES;
    },
  },
  methods: {
    search(isSearch) {
      if (!isSearch) {
        this.selectedType = '';
      }
      this.$parent.$emit('search-txs', this.selectedType);
    },
  },
};
</script>
