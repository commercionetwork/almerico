<template>
  <TopBodyCardComponent title="Filter txs">
    <template v-slot:content>
      <v-form>
        <v-select dense flat label="type" v-model="selectedType" :items="items">
          <template v-slot:selection="{ item }">
            <span class="text-subtitle-2 font-weight-bold" v-text="item.text" />
          </template>
        </v-select>
        <v-row>
          <v-col cols="6">
            <v-btn block color="primary" @click="onFilter(false)">
              Filter
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block outlined color="secondary" @click="onFilter(true)">
              Reset
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import { mapActions } from 'vuex';

export default {
  name: 'TransactionsFilter',
  components: { TopBodyCardComponent },
  data: () => ({
    selectedType: '',
  }),
  computed: {
    items() {
      return this.$config.transactions.supported_types;
    },
  },
  methods: {
    ...mapActions('transactions', {
      setTransactionsFilter: 'setTransactionsFilter',
    }),
    onFilter(reset) {
      if (reset) {
        this.selectedType = '';
      }
      this.setTransactionsFilter(this.selectedType);
    },
  },
};
</script>
