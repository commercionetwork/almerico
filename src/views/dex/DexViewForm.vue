<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <dex-view-selector :items="contracts" v-model="contract" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import DexViewSelector from './DexViewSelector.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DexViewForm',
  components: {
    DexViewSelector,
  },
  data() {
    return {
      contract: null,
    };
  },
  computed: {
    ...mapGetters('dex', ['contracts']),
  },
  watch: {
    contract(value) {
      this.fetchDex(value.id);
    },
  },
  methods: {
    ...mapActions('dex', ['fetchDex']),
  },
};
</script>
