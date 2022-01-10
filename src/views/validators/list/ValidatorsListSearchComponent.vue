<template>
  <TopContentCardComponent :title="$t('titles.searchValidator')">
    <template v-slot:content>
      <div
        class="fill-height d-flex flex-column justify-space-around align-content-space-around"
      >
        <div class="px-3">
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
        </div>
        <div class="px-3">
          <ValidatorsListFilterComponent v-on:filter="onFilter" />
        </div>
      </div>
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
