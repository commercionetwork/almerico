<template>
  <TopBodyCardComponent title="Search blocks">
    <template v-slot:content>
      <v-form @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="query.items" label="items" />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="query.maxHeight" label="max height" />
          </v-col>
        </v-row>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="info" dark v-bind="attrs" v-on="on">
              mdi-information-outline
            </v-icon>
          </template>
          <span v-html="tooltipMessage" />
        </v-tooltip>
        <v-btn
          class="ml-1 px-5"
          color="primary"
          v-text="'Search'"
          @click="onSubmit()"
        />
      </v-form>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import TopBodyCardComponent from "@/components/TopBodyCardComponent.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "BlocksSearch",
  components: { TopBodyCardComponent },
  data: () => ({
    query: {
      items: "",
      maxHeight: ""
    }
  }),
  computed: {
    ...mapGetters("blocks", {
      block: "latest"
    }),
    latestHeight() {
      return this.block ? this.block.header.height : "0";
    },
    tooltipMessage() {
      return "<strong>WARNING</strong>: The maximum number of items allowed is 1000!";
    }
  },
  methods: {
    ...mapActions("blocks", {
      getBlocks: "getBlocks"
    }),
    normaliseSearch() {
      const maxHeight = parseInt(this.query.maxHeight);
      const items = parseInt(this.query.items);
      if (isNaN(maxHeight) || isNaN(items)) return false;
      this.query.maxHeight =
        maxHeight > this.latestHeight ? this.latestHeight : `${maxHeight}`;
      this.query.items = items > 1000 ? "1000" : `${items}`;
      return true;
    },
    onSubmit() {
      if (this.normaliseSearch()) this.getBlocks(this.query);
    }
  }
};
</script>
