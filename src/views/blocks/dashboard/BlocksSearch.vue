<template>
  <v-card>
    <v-row class="px-3">
      <v-col cols="12">
        <v-form @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="query.items" placeholder="Items" />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="query.maxHeight"
                placeholder="Maximum height"
              />
            </v-col>
            <v-col cols="6" offset="3">
              <v-btn block color="primary" @click="onSubmit()"> Search </v-btn>
            </v-col>
            <v-col cols="3">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="info" dark v-bind="attrs" v-on="on">
                    mdi-information-outline
                  </v-icon>
                </template>
                <span v-html="tooltipMessage" />
              </v-tooltip>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "BlocksSearch",
  data: () => ({
    query: {
      maxHeight: "",
      items: "",
    },
  }),
  computed: {
    tooltipMessage() {
      return "<strong>WARNING</strong>: Setting an high number of items may take a very long time!";
    },
  },
  methods: {
    ...mapActions("blocks", {
      getBlocks: "getBlocks",
    }),
    onSubmit() {
      this.getBlocks(this.query);
    },
  },
};
</script>