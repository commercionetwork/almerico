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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksSearch',
  data: () => ({
    query: {
      items: '',
      maxHeight: '',
    },
  }),
  computed: {
    ...mapGetters('blocks', {
      block: 'latest',
    }),
    latestHeight() {
      return this.block ? this.block.header.height : '0';
    },
    tooltipMessage() {
      return '<strong>WARNING</strong>: The maximum number of items allowed is 1000!';
    },
  },
  methods: {
    ...mapActions('blocks', {
      getBlocks: 'getBlocks',
    }),
    normaliseSearch() {
      const maxHeight = parseInt(this.query.maxHeight);
      const items = parseInt(this.query.items);
      if (isNaN(maxHeight) || isNaN(items)) return false;
      this.query.maxHeight =
        maxHeight > this.latestHeight ? this.latestHeight : `${maxHeight}`;
      this.query.items = items > 1000 ? '1000' : `${items}`;
      return true;
    },
    onSubmit() {
      if (this.normaliseSearch()) this.getBlocks(this.query);
    },
  },
};
</script>
