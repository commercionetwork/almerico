<template>
  <v-row>
    <v-col cols="12" md="6" offset-md="3">
      <v-card outlined>
        <v-form :disabled="isHandling">
          <dex-view-selector :items="list" v-model="contract" />
          <dex-view-swap-manager :contract="contract" />
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DexViewSwapManager from './DexViewSwapManager.vue';
import DexViewSelector from './DexViewSelector.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'DexViewForm',
  components: {
    DexViewSelector,
    DexViewSwapManager,
  },
  data() {
    return {
      contract: null,
    };
  },
  computed: {
    ...mapGetters('dex', ['isHandling', 'list']),
  },
  created() {
    this.contract = this.list[0];
  },
};
</script>
