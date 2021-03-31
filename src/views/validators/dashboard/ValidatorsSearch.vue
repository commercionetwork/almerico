<template>
  <TopBodyCardComponent title="Search validator">
    <template v-slot:content>
      <v-form @submit.prevent="onFilter(active)">
        <v-text-field
          v-model="moniker"
          label="search ..."
          append-icon="mdi-magnify"
        >
          <template v-slot:prepend>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="info" dark v-bind="attrs" v-on="on">
                  mdi-information-outline
                </v-icon>
              </template>
              <span v-html="tooltipMessage" />
            </v-tooltip>
          </template>
        </v-text-field>
        <div class="d-flex justify-center">
          <v-radio-group v-model="active" row>
            <v-radio label="Active" :value="true" @click="onFilter" />
            <v-radio label="Inactive" :value="false" @click="onFilter" />
          </v-radio-group>
        </div>
      </v-form>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import TopBodyCardComponent from "@/components/TopBodyCardComponent.vue";

import { mapActions } from "vuex";

export default {
  name: "ValidatorsSearch",
  components: { TopBodyCardComponent },
  data: () => ({
    moniker: "",
    active: true
  }),
  computed: {
    tooltipMessage() {
      return "You can search by validator name and address or by linked account.<br>You can also filter by status.";
    }
  },
  methods: {
    ...mapActions("validators", {
      setValidatorsFilter: "setValidatorsFilter"
    }),
    onFilter() {
      const filter = {};
      filter.moniker = this.moniker;
      filter.active = this.active;
      this.setValidatorsFilter(filter);
    }
  }
};
</script>
