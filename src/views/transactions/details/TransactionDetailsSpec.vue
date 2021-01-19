<template>
  <v-card elevation="2">
    <v-card-title class="subtitle-2" v-text="hash" />
    <v-card-subtitle v-text="'Hash'" />
    <v-divider />
    <v-card-text>
      <div v-text="'Time'" />
      <div class="pb-1 font-weight-bold" v-text="time" />
      <div v-text="'Status'" />
      <div
        class="pb-1 font-weight-bold"
        :class="statusClass"
        v-text="statusText"
      />
      <div v-text="'Fee'" />
      <div class="pb-1 font-weight-bold" v-text="fee" />
      <div v-text="'Gas (used/wanted)'" />
      <div class="pb-1 font-weight-bold" v-text="gas" />
      <div v-text="'Height'" />
      <router-link
        v-if="version === ''"
        class="text-decoration-none font-weight-bold"
        v-text="height"
        :to="heightLink"
      />
      <div v-else v-text="height" />
    </v-card-text>
    <v-divider />
    <v-card-text>
      <div v-text="'Official node'" />
      <a :href="ledgerLink" target="_blank" v-text="ledgerLink"/>
    </v-card-text>
  </v-card>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'TransactionDetailsSpec',
  props: {
    fee: { type: String },
    gas: { type: String },
    hash: { type: String },
    height: { type: String },
    ledger: { type: String },
    status: { type: Number },
    time: { type: String },
    version: { type: String },
  },
  computed: {
    heightLink() {
      return {
        name: ROUTES.NAMES.BLOCKS_DETAILS,
        params: { id: this.height },
      };
    },
    ledgerLink() {
      return `${this.ledger}/txs/${this.hash}`;
    },
    statusClass() {
      return this.status === 0 ? 'error--text' : 'info--text';
    },
    statusText() {
      return this.status === 0 ? 'Failed' : 'Success';
    },
  },
};
</script>
