<template>
  <v-card elevation="2">
    <v-card-text>
      <v-list class="ma-1">
        <v-list-item-title class="word-break font-weight-bold" v-text="hash" />
        <v-list-item-subtitle class="text-capitalize" v-text="'hash'" />
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <div class="font-weight-bold" v-text="'Time'" />
            <div class="pb-1" v-text="time" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div class="font-weight-bold" v-text="'Status'" />
            <div class="pb-1" :class="statusClass" v-text="statusText" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="status === 0">
          <v-list-item-content>
            <div class="font-weight-bold" v-text="'Raw log'" />
            <div class="pb-1">{{ '&ldquo;' }}{{ rawLog }}{{ '&rdquo;' }}</div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div class="font-weight-bold" v-text="'Fee'" />
            <div class="pb-1" v-text="fee" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div class="font-weight-bold" v-text="'Gas (used/wanted)'" />
            <div class="pb-1" v-text="gas" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div  class="font-weight-bold" v-text="'Height'" />
            <router-link
              v-if="version === ''"
              class="text-decoration-none"
              v-text="height"
              :to="heightLink"
            />
            <div v-else v-text="height" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <div  class="font-weight-bold" v-text="'Official node (raw json)'" />
            <a
              class="text-break"
              :href="ledgerLink"
              target="_blank"
              v-text="ledgerLink"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
    rawLog: { type: String },
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

<style scoped>
.word-break {
  white-space: normal;
  word-break: break-all;
}
</style>
