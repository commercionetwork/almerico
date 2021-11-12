<template>
  <TopContentCardComponent :title="$t('titles.searchBlocks')">
    <template v-slot:content>
      <div class="fill-height">
        <v-form>
          <v-row>
            <v-col cols="10" offset="1">
              <v-text-field v-model="model.height" :label="$t('labels.height')">
                <template v-slot:prepend>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="info" dark v-bind="attrs" v-on="on">
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span v-html="$t('msgs.searchBlocksInfo')" />
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" offset="2">
              <v-btn
                @click="onSearch(false)"
                block
                color="primary"
                depressed
                v-text="$t('labels.search')"
              />
            </v-col>
            <v-col cols="4">
              <v-btn
                @click="onSearch(true)"
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
  </TopContentCardComponent>
</template>

<script>
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

export default {
  name: 'BlocksListSearchComponent',
  components: {
    TopContentCardComponent,
  },
  data: () => ({
    isSearching: false,
    model: { height: '' },
  }),
  methods: {
    onSearch(isSearching) {
      this.isSearching = isSearching;
    },
  },
};
</script>
