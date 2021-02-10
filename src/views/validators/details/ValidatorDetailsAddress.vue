<template>
  <v-card elevation="2">
    <v-toolbar flat class="py-1">
      <v-toolbar-title class="text-capitalize font-weight-bold">
        {{ moniker }}
        <div
          class="text-caption font-weight-bold"
          :class="details.status === 2 ? 'info--text' : 'warning--text'"
          v-text="status"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        v-if="picture != ''"
        max-height="75"
        max-width="75"
        :src="picture"
      />
      <v-icon
        v-else
        size="50"
        :color="details.status === 2 ? 'info' : 'warning'"
      >
        mdi-hubspot
      </v-icon>
    </v-toolbar>

    <v-card-text>
      <div>Operator:</div>
      <div class="font-weight-bold text-break" v-text="operator" />
      <div>Address:</div>
      <router-link
        class="font-weight-bold text-decoration-none text-break"
        v-text="account"
        :to="toAccount"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';

export default {
  name: 'ValidatorDetailsAddress',
  props: {
    account: {
      type: String,
      required: true,
      note: 'The account address',
    },
    operator: {
      type: String,
      required: true,
      note: 'The operator address',
    },
  },
  computed: {
    ...mapGetters('validators', {
      details: 'details',
    }),
    toAccount() {
      return {
        name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
        params: { id: this.account },
      };
    },
    moniker() {
      return this.details.description.moniker || '-';
    },
    picture() {
      return this.details.picture ? this.details.picture : '';
    },
    status() {
      return this.details.status === 2 ? 'active' : 'inactive';
    },
  },
};
</script>
