<template>
  <v-layout>
    <v-flex>
      <v-row v-if="error !== null" data-test="error">
        <v-col cols="12">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1" v-text="JSON.stringify(error)" />
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else data-test="content">
        <v-col cols="12">
          <v-card outlined>
            <BlocksTable :items="items" />
          </v-card>
        </v-col>
        <v-col
          cols="12"
          class="pa-5"
          v-intersect="{
            handler: onIntersect,
            options: {
              threshold: [0.5]
            }
          }"
        >
          <v-progress-linear
            v-if="isLoading"
            indeterminate
            rounded
            color="primary"
            height="25"
            value="10"
            data-test="loading"
          ></v-progress-linear
        ></v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import BlocksTable from "./BlocksTable";

import { mapActions, mapGetters } from "vuex";
import { BlocksTableAdapter } from "@/utils";

export default {
  name: "BlocksMiddleBody",
  components: {
    BlocksTable
  },
  computed: {
    ...mapGetters("blocks", {
      isLoading: "isLoading",
      error: "error",
      latest: "latest",
      blocks: "blocks",
      currentHeight: "currentHeight"
    }),
    ...mapGetters("validators", {
      validators: "validators",
      validatorsSet: "latestValidatorsSets"
    }),
    items() {
      return BlocksTableAdapter.setBlocks(this.blocks)
        .setValidators(this.validators)
        .setValidatorsSet(this.validatorsSet)
        .setValidatorConsensusPrefix(
          this.$config.generic.prefixes.validator.consensus.address
        )
        .get();
    }
  },
  methods: {
    ...mapActions("blocks", {
      getBlocks: "getBlocks",
      addBlocks: "addBlocks"
    }),
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting && !this.isLoading) {
        this.addBlocks({
          currentHeight: this.currentHeight,
          items: 25
        });
      }
    }
  },
  created() {
    if (this.latest !== null) {
      let height = this.latest.header.height;
      this.getBlocks({
        maxHeight: height,
        items: 100
      });
    }
  }
};
</script>
