<template>
  <BaseTopContentCard :title="$t('titles.searchBlocks')">
    <template v-slot:content>
      <div class="fill-height">
        <v-form>
          <v-row>
            <v-col cols="10" offset="1">
              <v-text-field
                :label="$t('labels.searchHeight')"
                append-icon="mdi-magnify"
                v-model="model.height"
                v-on:keydown.enter.prevent="search"
              >
                <template v-slot:prepend>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="info" dark v-bind="attrs" v-on="on">
                        mdi-information-outline
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

export default {
  name: 'BlocksListSearchComponent',
  components: {
    BaseTopContentCard,
  },
  data: () => ({
    BLOCKS,
    CONFIG,
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
