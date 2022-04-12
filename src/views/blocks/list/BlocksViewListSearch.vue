<template>
  <BaseTopContentCard :title="$t('titles.searchBlocks')">
    <template #content>
      <div class="fill-height">
        <v-form>
          <v-row>
            <v-col cols="10" offset="1">
              <v-text-field
                :append-icon="mdiMagnify"
                :label="$t('labels.searchHeight')"
                v-model="model.height"
                @keydown.enter.prevent="search"
              >
                <template #prepend>
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-icon color="info" dark v-bind="attrs" v-on="on">
                        {{ mdiInformationOutline }}
                      </v-icon>
                    </template>
                    <i18n tag="span" path="msgs.searchBlocksInfo">
                      <span v-text="BLOCKS.SEARCH_ITEMS" />
                      <span v-text="CONFIG.FIRST_HEIGHT" />
                    </i18n>
                  </v-tooltip>
                </template>
              </v-text-field>
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

import { BLOCKS, CONFIG } from '@/constants';
import { mdiInformationOutline, mdiMagnify } from '@mdi/js';

export default {
  name: 'BlocksViewListSearch',
  components: { BaseTopContentCard },
  data: () => ({
    BLOCKS,
    CONFIG,
    mdiInformationOutline,
    mdiMagnify,
    model: { height: '' },
  }),
  methods: {
    search(isSearching) {
      if (!isSearching) this.model.height = '';
      this.$parent.$emit('searching-blocks', this.model.height);
    },
  },
};
</script>
