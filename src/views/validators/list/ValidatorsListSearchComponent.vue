<template>
  <TopContentCardComponent :title="$t('titles.searchValidator')">
    <template v-slot:content>
      <v-form>
        <v-row>
          <v-col cols="10" offset="1">
            <v-text-field
              :label="$t('labels.searchNameAddressAccount')"
              append-icon="mdi-magnify"
              v-model="query"
              @input="onFilter"
              @blur="onFilter"
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
          <v-radio-group
            row
            v-model="active"
            @blur="onFilter"
            @change="onFilter"
          >
            <v-radio :label="$t('labels.active')" :value="true" />
            <v-radio :label="$t('labels.inactive')" :value="false" />
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
    active: true,
    query: '',
  }),
  methods: {
    ...mapActions('validators', {
      setValidatorsFilter: 'setValidatorsFilter',
    }),
    onFilter() {
      this.setValidatorsFilter({
        active: this.active,
        query: this.query,
      });
    },
  },
};
</script>
