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
      <v-spacer />
      <v-toolbar-items>
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
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-list dense class="text-break">
        <v-list-item>
          <v-list-item-content>
            <div>
              <span
                class="text-capitalize font-weight-bold"
                v-text="'operator:'"
              />
              <span class="pl-1" v-text="operator" />
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div>
              <span
                class="text-capitalize font-weight-bold"
                v-text="'address:'"
              />
              <router-link
                class="pl-1 text-decoration-none"
                :to="toAccount"
                v-text="account"
              />
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
