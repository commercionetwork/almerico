<template>
  <TopContentCardComponent :title="$t('titles.searchTxs')">
    <template v-slot:content>
      <div class="fill-height">
        <v-form>
          <v-row>
            <v-col cols="10" offset="1">
              <v-select
                dense
                flat
                :label="$t('labels.type')"
                v-model="selectedType"
                :items="types"
              >
                <template v-slot:selection="{ item }">
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    v-text="item.text"
                  />
                </template>
              </v-select>
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
  name: 'TransactionsListSearchComponent',
  components: { TopContentCardComponent },
  data: () => ({
    selectedType: '',
  }),
  computed: {
    types() {
      return [];
    },
  },
  methods: {
    onSearch(isReset) {
      console.log(isReset);
    },
  },
};
</script>
