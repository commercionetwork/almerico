<template>
  <TopContentCardComponent :title="$t('titles.searchValidator')">
    <template v-slot:content>
      <v-form @submit.prevent="onFilter(active)">
        <v-row>
          <v-col cols="10" offset="1">
            <v-text-field
              :label="$t('labels.search')"
              append-icon="mdi-magnify"
              v-model="query"
            >
              <template v-slot:prepend>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="info" dark v-bind="attrs" v-on="on">
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span v-html="$t('msgs.searchValidatorsInfo')" />
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <div class="d-flex justify-center">
          <v-radio-group row v-model="active">
            <v-radio label="Active" :value="true" @click="onFilter" />
            <v-radio label="Inactive" :value="false" @click="onFilter" />
          </v-radio-group>
        </div>
      </v-form>
    </template>
  </TopContentCardComponent>
</template>

<script>
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

import { mapActions } from 'vuex';

export default {
  name: 'ValidatorsListSearchComponent',
  components: { TopContentCardComponent },
  data: () => ({
    query: '',
    active: true,
  }),
  methods: {
    ...mapActions('validators', {
      setValidatorsFilter: 'setValidatorsFilter',
    }),
    onFilter() {
      const filter = {};
      filter.query = this.query;
      filter.active = this.active;
      this.setValidatorsFilter(filter);
    },
  },
};
</script>
