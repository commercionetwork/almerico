<template>
  <TopContentCardComponent :title="$t('titles.searchTxs')">
    <template v-slot:content>
      <div class="fill-height">
        <v-form>
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
          <v-row>
            <v-col cols="6">
              <v-btn
                block
                color="primary"
                @click="onSearch(false)"
                v-text="$t('labels.search')"
              />
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                outlined
                color="secondary"
                @click="onSearch(true)"
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
