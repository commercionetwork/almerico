<template>
  <v-card elevation="2">
    <v-row class="px-3">
      <v-col cols="12">
        <v-form @submit.prevent="onFilter(active)">
          <v-row>
            <v-col cols="1">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="info" dark v-bind="attrs" v-on="on">
                    mdi-information-outline
                  </v-icon>
                </template>
                <span v-html="tooltipMessage" />
              </v-tooltip>
            </v-col>
            <v-col cols="11">
              <v-text-field
                v-model="moniker"
                placeholder="Search Validator"
                append-icon="mdi-magnify"
              />
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                :outlined="!active"
                color="primary"
                @click="onFilter(true)"
              >
                Active
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                :outlined="active"
                color="primary"
                @click="onFilter(false)"
              >
                Inactive
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ValidatorsSearch',
  data: () => ({
    moniker: '',
    active: true,
  }),
  computed: {
    tooltipMessage() {
      return 'You can search by name or by account and validator address.<br>You can also filter by status.';
    },
  },
  methods: {
    ...mapActions('validators', {
      setValidatorsFilter: 'setValidatorsFilter',
    }),
    onFilter(active) {
      this.active = active;
      let filter = {};
      filter.moniker = this.moniker;
      filter.active = this.active;
      this.setValidatorsFilter(filter);
    },
  },
};
</script>
