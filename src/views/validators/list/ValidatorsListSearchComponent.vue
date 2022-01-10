<template>
  <TopContentCardComponent :title="$t('titles.searchValidator')">
    <template v-slot:content>
      <v-form>
        <v-row>
          <v-col cols="10" offset-md="1">
            <v-text-field
              :label="$t('labels.searchNameAddressAccount')"
              append-icon="mdi-magnify"
              v-model="query"
              @input="search"
              @blur="search"
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
          <v-col cols="8" offset-md="2">
            <ValidatorsListFilterComponent v-on:filter="onFilter" />
          </v-col>
        </v-row>
      </v-form>
    </template>
  </TopContentCardComponent>
</template>

<script>
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';
import ValidatorsListFilterComponent from './ValidatorsListFilterComponent.vue';
import { VALIDATORS } from '@/constants';
import { mapActions } from 'vuex';

export default {
  name: 'ValidatorsListSearchComponent',
  components: {
    ValidatorsListFilterComponent,
    TopContentCardComponent,
  },
  data: () => ({
    status: VALIDATORS.FILTER.ACTIVE,
    query: '',
  }),
  methods: {
    ...mapActions('validators', {
      setValidatorsFilter: 'setValidatorsFilter',
    }),
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
