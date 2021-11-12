<template>
  <v-card outlined>
    <v-toolbar flat class="py-1">
      <v-toolbar-title class="text-capitalize font-weight-bold">
        {{ detail.description.moniker }}
        <div
          class="text-caption font-weight-bold"
          :class="isActive ? 'info--text' : 'warning--text'"
          v-text="isActive ? $t('labels.active') : $t('labels.inactive')"
        />
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-icon size="50" :color="isActive ? 'info' : 'warning'">
          mdi-hubspot
        </v-icon>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <div class="pa-2">
        <div
          class="text-capitalize font-weight-bold"
          v-text="$t('labels.operator')"
        />
        <div class="pl-1 font-monotype" v-text="detail.operator_address" />
      </div>
      <div class="pa-2">
        <div
          class="text-capitalize font-weight-bold"
          v-text="$t('labels.address')"
        />
        <router-link
          class="pl-1 text-decoration-none font-monotype"
          :to="toAccount"
          v-text="account"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ROUTES } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsDetailMonikerComponent',
  props: ['account'],
  computed: {
    ...mapGetters('validators', {
      detail: 'detail',
    }),
    isActive() {
      return this.detail.status === 3;
    },
    toAccount() {
      return {
        name: ROUTES.NAME.ACCOUNT,
        params: { id: this.account },
      };
    },
  },
};
</script>
