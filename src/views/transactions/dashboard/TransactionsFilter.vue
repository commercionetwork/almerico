<template>
  <v-card outlined>
    <v-row class="pa-3">
      <v-col cols="12">
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-select
                label="Select transaction type"
                v-model="selectedType"
                :items="items"
              ></v-select>
            </v-col>
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
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TransactionsFilter',
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
